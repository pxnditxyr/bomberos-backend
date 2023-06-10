import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid'

import { User } from 'src/auth/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';


@Injectable()
export class CategoriesService {

  constructor (
    @InjectRepository( Category )
    private readonly categoryRepository : Repository<Category>,

    private readonly dataSource : DataSource
  ) {}

  async create( createCategoryDto: CreateCategoryDto, user : User ) {
    try {
      const category = this.categoryRepository.create({
        ...createCategoryDto,
        article: [],
        user
      })
      await this.categoryRepository.save( category )
      return category
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll() {
    const categories = await this.categoryRepository.find({ where: { status: true } })
    return categories
  }

  async findOne( term : string ) {
    let category : Category | null

    if ( isUUID( term ) )
      category = await this.categoryRepository.findOneBy({ id: term, status: true })
    else
      category = await this.categoryRepository.findOneBy({ name: term, status: true })

    if ( !category )
      throw new BadRequestException( `Category with term ${ term } not found` )

    return category
  }

  async update( id : string, updateCategoryDto : UpdateCategoryDto, user : User ) {
    const category = await this.categoryRepository.preload({ id, ...updateCategoryDto, user })

    if ( !category )
      throw new BadRequestException( `Category with id ${ id } not found` )

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.save( category )
      await queryRunner.commitTransaction()
      await queryRunner.release()

      return category
    } catch ( error ) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      this.handlerDBExceptions( error )
    }

  }

  async remove( id : string ) {
    const category = await this.findOne( id )
    await this.categoryRepository.remove( category )
    return
  }

  private handlerDBExceptions ( error : any ) {
    if ( error.code === '23505' )
      throw new BadRequestException( error.detail )
    throw new InternalServerErrorException( `Unexpected error: ${ error.code }` )
  }
}

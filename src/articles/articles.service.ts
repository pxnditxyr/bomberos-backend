import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { DataSource, ILike, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {

  constructor (
    @InjectRepository( Article )
    private readonly articleRepository : Repository<Article>,
    private readonly categoryService : CategoriesService,

    private readonly dataSource : DataSource
  ) {}

  async create( createArticleDto: CreateArticleDto, user : User ) {

    const { category, ...articleData } = createArticleDto
    const categoryFromDB = await this.categoryService.findOne( category )

    try {
      const article = this.articleRepository.create({
        ...articleData,
        category: categoryFromDB,
        user
      })
      await this.articleRepository.save( article )
      return article
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }

  }

  async findAll() {
    const articles = await this.articleRepository.find()
    return articles
  }

  async findAllPlain() {
    const articles = await this.findAll()
    const articlesForSend = articles.map( async( article ) => {
      const categoryName = await this.categoryService.findOne( article.categoryId ).then( category => category.name )
      return ({
        ...article,
        category: categoryName,
        user: article.user.email
      })
    })
    return Promise.all( articlesForSend )
  }

  async findOne( id : string ) {
    const article = await this.articleRepository.findOneBy({ id })
    if ( !article )
      throw new BadRequestException( `Article with id ${ id } not found` )
    return article
  }

  async findByName ( name : string ) {
    const articles = await this.articleRepository.find({
      where: {
        name: ILike( `%${ name }%` )
      }
    })

    const articlesForSend = articles.map( async( article ) => {
      const categoryName = await this.categoryService.findOne( article.categoryId ).then( category => category.name )
      return ({
        ...article,
        category: categoryName,
        user: article.user.email
      })
    })

    return Promise.all( articlesForSend )
  }

  async findOnePlain ( id : string ) {
    const article = await this.findOne( id )
    return {
      ...article,
      category: await this.categoryService.findOne( article.categoryId ).then( category => category.name ),
      user: article.user.email
    }
  }

  async update( id: string, updateArticleDto: UpdateArticleDto, user : User ) {
    const { category, ...articleData } = updateArticleDto
    let categoryFromDB : Category | null
    if ( category ) {
      categoryFromDB = await this.categoryService.findOne( category )
    } else {
      const articleFromDB = await this.findOne( id )
      categoryFromDB = articleFromDB.category
    }
    const article = await this.articleRepository.preload({
      id,
      ...articleData,
      user,
      category: categoryFromDB
    })

    if ( !article )
      throw new BadRequestException( `Article with id ${ id } not found` )

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.save( article )
      await queryRunner.commitTransaction()
      await queryRunner.release()
      return {
        ...article,
        user: article.user.email,
        category: await this.categoryService.findOne( article.categoryId ).then( category => category.name )
      }
    } catch ( error ) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      this.handlerDBExceptions( error )
    }
  }

  async remove( id: string ) {
    const article = await this.findOne( id )
    await this.articleRepository.remove( article )
    return
  }

  private handlerDBExceptions ( error : any ) {
    if ( error.code === '23505' )
      throw new BadRequestException( error.detail )
    throw new InternalServerErrorException( `Unexpected error, please check the logs` )
  }
}

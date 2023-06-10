import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {

  constructor (
    @InjectRepository( Article )
    private readonly articleRepository : Repository<Article>,
    private readonly categoryService : CategoriesService
  ) {}

  async create( createArticleDto: CreateArticleDto, user : User) {

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

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }

  private handlerDBExceptions ( error : any ) {
    if ( error.code === '23505' )
      throw new BadRequestException( error.detail )
    throw new InternalServerErrorException( `Unexpected error, please check the logs` )
  }
}

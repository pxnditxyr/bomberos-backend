import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller( 'articles' )
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Auth()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @GetUser() user : User
  ) {
    return this.articlesService.create( createArticleDto, user );
  }

  @Get()
  findAll() {
    return this.articlesService.findAllPlain();
  }

  @Get( ':id' )
  findOne( @Param( 'id', ParseUUIDPipe ) id: string ) {
    return this.articlesService.findOnePlain( id );
  }

  @Get( 'name/:name' )
  findByName( @Param( 'name' ) name: string ) {
    return this.articlesService.findByName( name );
  }

  @Patch( ':id' )
  @Auth()
  update(
    @Param( 'id', ParseUUIDPipe ) id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @GetUser() user : User
  ) {
    return this.articlesService.update( id, updateArticleDto, user );
  }

  @Delete( ':id' )
  @Auth()
  remove( @Param( 'id', ParseUUIDPipe ) id: string ) {
    return this.articlesService.remove( id );
  }
}

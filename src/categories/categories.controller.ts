import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller( 'categories' )
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {}

  @Post()
  @Auth()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user : User
  ) {
    return this.categoriesService.create( createCategoryDto, user );
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get( ':term' )
  findOne( @Param( 'term' ) term: string ) {
    return this.categoriesService.findOne( term );
  }

  @Patch( ':id' )
  @Auth()
  update(
    @Param( 'id', ParseUUIDPipe ) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser() user : User
  ) {
    return this.categoriesService.update( id, updateCategoryDto, user );
  }

  @Delete( ':id' )
  @Auth()
  remove( @Param( 'id', ParseUUIDPipe ) id : string ) {
    return this.categoriesService.remove( id );
  }
}

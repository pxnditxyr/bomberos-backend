import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [ ArticlesController ],
  providers: [ ArticlesService ],
  imports: [
    TypeOrmModule.forFeature([ Article ]),
    AuthModule,
    CategoriesModule
  ],
  exports: [ ArticlesService ]
})
export class ArticlesModule {}

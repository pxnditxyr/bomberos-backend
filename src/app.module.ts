import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { StationsModule } from './stations/stations.module';
import { CategoriesModule } from './categories/categories.module';
import { ArticlesModule } from './articles/articles.module';
import { CallRegistersModule } from './call-registers/call-registers.module';
import { IncidentDetailsModule } from './incident-details/incident-details.module';

@Module({

  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number( process.env.DB_PORT ),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      autoLoadEntities: true,
      synchronize: true,
      logger: 'advanced-console',
    }),
    AuthModule,
    StationsModule,
    CategoriesModule,
    ArticlesModule,
    CallRegistersModule,
    IncidentDetailsModule
  ]

})
export class AppModule {}

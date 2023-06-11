import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ StationsController ],
  providers: [ StationsService ],
  imports: [
    TypeOrmModule.forFeature([ Station ]),
    AuthModule,
  ],
  exports: [ StationsService ],
})
export class StationsModule {}

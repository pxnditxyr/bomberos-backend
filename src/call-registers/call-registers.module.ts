import { Module } from '@nestjs/common';
import { CallRegistersService } from './call-registers.service';
import { CallRegistersController } from './call-registers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallRegister } from './entities/call-register.entity';
import { AuthModule } from 'src/auth/auth.module';
import { StationsModule } from 'src/stations/stations.module';

@Module({
  controllers: [ CallRegistersController ],
  providers: [ CallRegistersService ],
  imports: [
    TypeOrmModule.forFeature([ CallRegister ]),
    AuthModule,
    StationsModule
  ],
  exports: [ CallRegistersService ]
})
export class CallRegistersModule {}

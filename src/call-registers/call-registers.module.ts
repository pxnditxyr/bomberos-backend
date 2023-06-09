import { Module } from '@nestjs/common';
import { CallRegistersService } from './call-registers.service';
import { CallRegistersController } from './call-registers.controller';

@Module({
  controllers: [CallRegistersController],
  providers: [CallRegistersService]
})
export class CallRegistersModule {}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CallRegistersService } from './call-registers.service';
import { CreateCallRegisterDto } from './dto/create-call-register.dto';
import { UpdateCallRegisterDto } from './dto/update-call-register.dto';

@Controller('call-registers')
export class CallRegistersController {
  constructor(private readonly callRegistersService: CallRegistersService) {}

  @Post()
  create(@Body() createCallRegisterDto: CreateCallRegisterDto) {
    return this.callRegistersService.create(createCallRegisterDto);
  }

  @Get()
  findAll() {
    return this.callRegistersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callRegistersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCallRegisterDto: UpdateCallRegisterDto) {
    return this.callRegistersService.update(+id, updateCallRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.callRegistersService.remove(+id);
  }
}

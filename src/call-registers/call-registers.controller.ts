import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CallRegistersService } from './call-registers.service';
import { CreateCallRegisterDto } from './dto/create-call-register.dto';
import { UpdateCallRegisterDto } from './dto/update-call-register.dto';

@Controller( 'call-registers' )
export class CallRegistersController {
  constructor(
    private readonly callRegistersService: CallRegistersService
  ) {}

  @Post()
  @Auth()
  create( @Body() createCallRegisterDto: CreateCallRegisterDto ) {
    return this.callRegistersService.create( createCallRegisterDto );
  }

  @Get()
  findAll() {
    return this.callRegistersService.findAllPlain();
  }

  @Get( ':id' )
  findOne( @Param( 'id', ParseUUIDPipe ) id: string ) {
    return this.callRegistersService.findOnePlain( id );
  }

  @Patch( ':id' )
  @Auth()
  update( @Param( 'id', ParseUUIDPipe ) id: string, @Body() updateCallRegisterDto: UpdateCallRegisterDto ) {
    return this.callRegistersService.update( id, updateCallRegisterDto );
  }

  @Delete( ':id' )
  @Auth()
  remove( @Param( 'id', ParseUUIDPipe ) id: string ) {
    return this.callRegistersService.remove( id );
  }
}

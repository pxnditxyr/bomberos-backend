import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller( 'stations' )
export class StationsController {
  constructor(
    private readonly stationsService: StationsService
  ) {}

  @Post()
  @Auth()
  create( @Body() createStationDto: CreateStationDto ) {
    return this.stationsService.create( createStationDto );
  }

  @Get()
  findAll() {
    return this.stationsService.findAll();
  }

  @Get( ':term' )
  findOne( @Param( 'term' ) term: string ) {
    return this.stationsService.findOne( term );
  }

  @Patch( ':id' )
  @Auth()
  update( @Param( 'id' ) id: string, @Body() updateStationDto: UpdateStationDto ) {
    return this.stationsService.update( id, updateStationDto );
  }

  @Delete(':id')
  @Auth()
  remove( @Param( 'id' ) id: string ) {
    return this.stationsService.remove( id );
  }
}

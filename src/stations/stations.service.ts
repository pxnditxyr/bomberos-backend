import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { validate as isUUID } from 'uuid'

import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './entities/station.entity';

@Injectable()
export class StationsService {

  constructor (
    @InjectRepository( Station )
    private readonly stationRepository : Repository<Station>
  ) {}

  async create( createStationDto: CreateStationDto ) {
    const station = this.stationRepository.create( createStationDto )

    try {
      await this.stationRepository.save( station )
      return station
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }

  }

  async findAll () {
    const stations = await this.stationRepository.find()
    return stations
  }

  async findOne( term : string ) {
    let station : Station | null
    if ( isUUID( term ) )
      station = await this.stationRepository.findOneBy({ id: term })
    else
      station = await this.stationRepository.findOneBy({ name: term.toLowerCase() })

    if ( !station )
      throw new BadRequestException( 'Station not found' )

    return station
  }

  async update( id : string, updateStationDto : UpdateStationDto ) {
    const station = await this.stationRepository.preload({
      id: id,
      ...updateStationDto
    })
    if ( !station )
      throw new NotFoundException( `Station #${ id } not found` )

    try {
      await this.stationRepository.save( station )
      return station
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async remove( id: string ) {
    const station = await this.findOne( id )
    if ( !station )
      throw new NotFoundException( `Station #${ id } not found` )
    await this.stationRepository.remove( station )
    return
  }

  private handlerDBExceptions ( error : any ) {
    if ( error.code === '23505' )
      throw new BadRequestException( error.detail )
    throw new InternalServerErrorException( `Unknown error: ${ error.message }` )
  }
}

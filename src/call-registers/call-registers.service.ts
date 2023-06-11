import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StationsService } from 'src/stations/stations.service';
import { Repository } from 'typeorm';
import { CreateCallRegisterDto } from './dto/create-call-register.dto';
import { UpdateCallRegisterDto } from './dto/update-call-register.dto';
import { CallRegister } from './entities/call-register.entity';

@Injectable()
export class CallRegistersService {

  constructor (
    @InjectRepository( CallRegister )
    private readonly callRegisterRepository: Repository<CallRegister>,

    private readonly stationsService: StationsService
  ) {}

  async create( createCallRegisterDto: CreateCallRegisterDto ) {
    const station = await this.stationsService.findOne( createCallRegisterDto.station )
    const callRegister = this.callRegisterRepository.create({
      ...createCallRegisterDto,
      station
    })

    try {
      await this.callRegisterRepository.save( callRegister )
      return callRegister
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll() {
    const callRegisters = await this.callRegisterRepository.find()
    return callRegisters
  }

  async findAllPlain() {
    const callRegisters = await this.findAll()
    return callRegisters.map( callRegister => ({
      ...callRegister,
      station: callRegister.station.name
    }))
  }

  async findOne( id: string ) {
    const callRegister = await this.callRegisterRepository.findOneBy({ id })
    if ( !callRegister )
      throw new NotFoundException( `Call register with id ${ id } not found` )
    return callRegister
  }

  async findOnePlain ( id: string ) {
    const callRegister = await this.findOne( id )
    return {
      ...callRegister,
      station: callRegister.station.name
    }
  }

  async update( id: string, updateCallRegisterDto: UpdateCallRegisterDto ) {
    const { station, ...updateCallRegisterDtoWithoutStation } = updateCallRegisterDto
    const callRegister = await this.callRegisterRepository.preload({
      id,
      ...updateCallRegisterDtoWithoutStation,
    })
    if ( !callRegister )
      throw new NotFoundException( `Call register with id ${ id } not found` )
    try {
      await this.callRegisterRepository.save( callRegister )
      return callRegister
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async remove( id: string ) {
    const callRegister = await this.findOne( id )
    await this.callRegisterRepository.remove( callRegister )
    return
  }

  private handlerDBExceptions ( error : any ) {
    if ( error.code === '23505' )
      throw new BadRequestException( error.detail )
    throw new InternalServerErrorException( `Unknown error: ${ error.message }` )
  }
}

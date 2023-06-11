import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import { hashSync, compareSync } from 'bcrypt'
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SignInUserDto } from './dto/signin-user.dto';

@Injectable()
export class AuthService {

  private readonly logger = new Logger( 'auth' )

  constructor (
    @InjectRepository( User )
    private readonly userRepository : Repository<User>,

    private readonly jwtService : JwtService
  ) {}

  async create( createUserDto : CreateUserDto ) {
    try {
      const { password, ...userData } = createUserDto
      
      const user = this.userRepository.create({
        ...userData,
        password: hashSync( password, 10 )
      })

      await this.userRepository.save( user )

      const { password: pass, ...createdUser } = user

      return {
        ...createdUser,
        token: this.getJwtToken({ id: user.id })
      }
    } catch ( error ) {
      this.logger.error( error )
      this.handlerDBErrors( error )
    }
  }

  async signIn ( signInUserDto : SignInUserDto ) {
    const { email, password } = signInUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: [ 'id', 'email', 'password', 'name', 'lastName', 'phone', 'dni', 'civilStatus', 'gender', 'birthDate' ]
    })

    if ( !user )
      throw new UnauthorizedException( 'Invalid credentials' )
    if ( !compareSync( password, user.password ) )
      throw new UnauthorizedException( 'Invalid credentials' )

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }

  async checkAuthStatus ( user : User ) {
    const { id } = user
    const userFromDB = await this.userRepository.findOne({
      where: { id },
      select: [ 'id', 'email', 'password', 'name', 'lastName', 'phone', 'dni', 'civilStatus', 'gender', 'birthDate' ]
    })

    return {
      ...userFromDB,
      token: this.getJwtToken({ id: user.id })
    }
  }

  private handlerDBErrors ( error : any ) : never {
    if ( error.code === '23505' )
      throw new BadRequestException( error.detail )
    throw new BadRequestException( error.message )
  }

  private getJwtToken ( payload : JwtPayload ) {
    const token = this.jwtService.sign( payload )
    return token
  }
  
}

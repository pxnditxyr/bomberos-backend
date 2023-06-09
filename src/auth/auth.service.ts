import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor (
    @InjectRepository( User )
    private readonly userRepository : Repository<User>

  ) {}

  async create( createUserDto : CreateUserDto ) {
    try {
      const { password, ...userData } = createUserDto
      // TODO: hash password
      const user = this.userRepository.create({
        ...userData,
        password
      })


    } catch ( error ) {
      this.handlerDBErrors( error )
    }
  }

  private handlerDBErrors ( error : any ) : never {
    if ( error.code === '23505' )
      throw new BadRequestException( error.detail )
    throw new BadRequestException( error.message )
  }
  
}

import { IsDateString, IsEmail, IsEnum, IsNumber, IsPositive, IsString, MinLength } from 'class-validator'
import { CivilStatus } from '../interfaces/valid-civil-status.interface'
import { Gender } from '../interfaces/valid-genders.interface'

export class CreateUserDto {

  @IsString()
  @MinLength( 3 )
  name: string

  @IsString()
  @MinLength( 3 )
  lastName: string

  @IsNumber()
  @IsPositive()
  phone: number

  @IsNumber()
  @IsPositive()
  dni: number

  @IsEnum( CivilStatus )
  civilStatus: CivilStatus

  @IsEnum( Gender )
  gender: Gender

  @IsDateString()
  birthDate: Date

  @IsEmail()
  email: string

  @IsString()
  @MinLength( 6 )
  password: string
}

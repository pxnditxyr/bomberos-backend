import { IsDateString, IsEmail, IsEnum, IsNumber, IsPositive, IsString, MinLength } from 'class-validator'
import { CivilStatus } from '../interfaces/valid-civil-status.interface'
import { Gender } from '../interfaces/valid-genders.interface'
import { ValidRoles } from '../interfaces/valid-roles.interface'

export class CreateUserDto {

  @IsString()
  @MinLength( 3 )
  name: string

  @IsString()
  @MinLength( 3 )
  lastName: string

  @IsString()
  @MinLength( 8 )
  phone: number

  @IsNumber()
  @MinLength( 4 )
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

  @IsEnum( ValidRoles )
  role: ValidRoles
}

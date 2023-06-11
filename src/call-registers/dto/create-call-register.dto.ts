import { IsArray, IsNumber, IsPositive, IsString, MinLength } from 'class-validator'

export class CreateCallRegisterDto {
  @IsString()
  @MinLength( 3 )
  affectedName: string

  @IsString()
  @MinLength( 5 )
  callAddress: string

  @IsString()
  @MinLength( 5 )
  description: string

  @IsNumber()
  @IsPositive()
  affectedPhone: number

  @IsString()
  station: string

  @IsString( { each: true } )
  @IsArray()
  users: string[]
}

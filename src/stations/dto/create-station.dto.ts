import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateStationDto {
  @IsString()
  name: string

  @IsString()
  address: string

  @IsNumber()
  phone: number

  @IsString()
  email: string

  @IsBoolean()
  @IsOptional()
  status: boolean
}

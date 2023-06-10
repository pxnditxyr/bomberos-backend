import { IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CreateArticleDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description: string

  @IsNumber()
  @IsOptional()
  price: number

  @IsNumber()
  @IsOptional()
  stock: number

  @IsString()
  @MinLength( 2 )
  code: string

  @IsString()
  category: string
}

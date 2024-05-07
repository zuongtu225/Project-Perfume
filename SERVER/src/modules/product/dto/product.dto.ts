import { IsNotEmpty, IsNumber, IsBoolean, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsBoolean()
  isBestSeller: boolean;

  @IsString()
  @IsNotEmpty()
  description: string;
}

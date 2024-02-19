import { IsNotEmpty, IsString } from 'class-validator';

export class ItemDto {
  name: string;
  description: string;
  price: number;
}

export class ProductDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;
}

export class QueryProductsDto {
  @IsNotEmpty()
  @IsString()
  userName: string;
}

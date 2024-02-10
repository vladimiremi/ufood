import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ItemDto } from './product.dto';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('/:productId/items')
  getItems(@Param('productId') productId: string) {
    return this.productService.getItems(productId);
  }

  @Post('/:productId/items')
  createItem(@Param('productId') productId: string, @Body() data: ItemDto) {
    console.log(data);
    return this.productService.createItem(productId, {
      description: data.description,
      name: data.name,
      price: data.price,
    });
  }
}

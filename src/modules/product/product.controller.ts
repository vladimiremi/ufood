import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ItemDto, QueryProductsDto } from './product.dto';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(@Query() query: QueryProductsDto) {
    return this.productService.getProducts(query.userName);
  }

  @Get('/:productId/items')
  getItems(@Param('productId') productId: string) {
    return this.productService.getItems(productId);
  }

  @Post('/:productId/items')
  createItem(@Param('productId') productId: string, @Body() data: ItemDto) {
    return this.productService.createItem(productId, {
      description: data.description,
      name: data.name,
      price: data.price,
    });
  }

  @Put('/items/:id')
  updateItem(@Param('id') id: string, @Body() data: ItemDto) {
    return this.productService.editItem(id, {
      description: data.description,
      name: data.name,
      price: data.price,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ItemDto } from './product.dto';

export class ItemParam {
  name: string;
  description: string;
  price: number;
}

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async getProducts(userId: string) {
    return await this.prisma.product.findMany({
      where: {
        userId: userId || '',
      },
    });
  }

  async getItems(productId: string) {
    return await this.prisma.item.findMany({
      where: {
        productId: productId || '',
      },
    });
  }

  async createItem(productId: string, data: ItemParam) {
    return await this.prisma.item.create({
      data: {
        productId: productId,
        name: data.name,
        description: data.description,
        price: data.price,
      },
    });
  }

  async editItem(id: string, data: ItemDto) {
    return await this.prisma.item.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
      },
    });
  }
}

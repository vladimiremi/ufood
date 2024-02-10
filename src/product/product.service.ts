import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

export class ItemParam {
  name: string;
  description: string;
  price: number;
}

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async getProducts() {
    return await this.prisma.product.findMany();
  }

  async getItems(productId: string) {
    return await this.prisma.item.findMany({
      where: {
        productId: productId,
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
}

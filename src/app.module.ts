import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './infra/prisma/prisma.service';
import { ProductModule } from './modules/product/product.module';
import { EstablishmentModule } from './modules/establishment/establishment.module';

@Module({
  imports: [ProductModule, EstablishmentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

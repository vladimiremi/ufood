import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { EstablishmentController } from './establishment.controller';

@Module({
  imports: [],
  controllers: [EstablishmentController],
  providers: [PrismaService, EstablishmentService],
})
export class EstablishmentModule {}

import { Injectable } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class EstablishmentService {
  constructor(private prisma: PrismaService) {}
  getEstablishments() {
    return this.prisma.user.findMany({
      where: {
        type: UserType.ESTABLISHMENT,
      },
    });
  }
}

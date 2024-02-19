import { Controller, Get } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';

@Controller('establishments')
export class EstablishmentController {
  constructor(private establishmentService: EstablishmentService) {}

  @Get()
  getEstablishments() {
    return this.establishmentService.getEstablishments();
  }
}

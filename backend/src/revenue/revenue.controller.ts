import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { UpdateRevenueAccountDTO } from './dto/update-revenue.dto';

@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.revenueService.payRevenue(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenueService.delete(id);
  }
}

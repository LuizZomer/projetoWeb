import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { PayRevenueDTO } from './dto/pay-revenue.dto';

@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Patch(':revenueId')
  update(
    @Param('revenueId') revenueId: string,
    @Body() orderInfo: PayRevenueDTO,
  ) {
    return this.revenueService.payRevenue({
      revenueId,
      orderInfo,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenueService.delete(id);
  }
}

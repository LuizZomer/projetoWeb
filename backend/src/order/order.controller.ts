import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { IOrderList } from './order.gateway';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAllOrder(
    @Query('revenue') revenue: IOrderList['revenue'],
    @Query('sequence') sequence: IOrderList['sequence'],
  ) {
    return this.orderService.FindAllOrder({ revenue, sequence });
  }
}

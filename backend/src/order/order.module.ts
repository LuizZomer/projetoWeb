import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderGateway } from './order.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { RevenueService } from 'src/revenue/revenue.service';

@Module({
  providers: [OrderService, OrderGateway, PrismaService, RevenueService],
})
export class OrderModule {}

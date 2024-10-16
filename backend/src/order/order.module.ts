import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderGateway } from './order.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { RevenueService } from 'src/revenue/revenue.service';
import { OrderController } from './order.controller';
import { FinanceModule } from 'src/finance/finance.module';

@Module({
  imports: [FinanceModule],
  providers: [OrderService, OrderGateway, PrismaService, RevenueService],
  controllers: [OrderController],
})
export class OrderModule {}

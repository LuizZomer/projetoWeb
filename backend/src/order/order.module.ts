import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderGateway } from './order.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { RevenueService } from 'src/revenue/revenue.service';
import { OrderController } from './order.controller';
import { FinanceModule } from 'src/finance/finance.module';
import { CustomerService } from 'src/customer/customer.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [FinanceModule, CustomerModule, AuthModule],
  providers: [OrderService, OrderGateway, PrismaService, RevenueService],
  controllers: [OrderController],
})
export class OrderModule {}

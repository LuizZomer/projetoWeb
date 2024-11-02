import { Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinanceModule } from 'src/finance/finance.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [FinanceModule, CustomerModule],
  controllers: [RevenueController],
  providers: [RevenueService, PrismaService],
})
export class RevenueModule {}

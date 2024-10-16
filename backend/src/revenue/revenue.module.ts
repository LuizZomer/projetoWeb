import { forwardRef, Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinanceModule } from 'src/finance/finance.module';
import { FinanceService } from 'src/finance/finance.service';

@Module({
  imports: [FinanceModule],
  controllers: [RevenueController],
  providers: [RevenueService, PrismaService],
})
export class RevenueModule {}

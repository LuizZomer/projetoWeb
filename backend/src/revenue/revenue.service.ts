import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageGenerator } from 'src/utils/function';
import { CreateRevenueAccountDTO } from './dto/create-revenue.dto';
import { FinanceType } from 'src/enums/financeTypes.enum';
import { FinanceService } from 'src/finance/finance.service';

@Injectable()
export class RevenueService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly financeServices: FinanceService,
  ) {}

  async createRevenueAccount({
    date,
    orderId,
    value,
    customerId,
    customerName,
  }: CreateRevenueAccountDTO) {
    const revenue = await this.prisma.revenue.create({
      data: {
        date,
        status: false,
        orderId,
        customerId,
        customerName,
        value,
      },
    });

    await this.financeServices.createFinance({
      dueDate: date.toString(),
      status: false,
      type: FinanceType.RECEIVABLE,
      value,
      description: `Anfrage für ${customerName}`,
      revenueId: revenue.id,
    });
  }

  async findAllRevenue() {
    return this.prisma.revenue.findMany();
  }

  async payRevenue(revenueId: string) {
    const currentRevenueStatus = await this.prisma.revenue.findUnique({
      where: { id: revenueId },
      select: { status: true },
    });

    await this.prisma.revenue.update({
      data: {
        status: !currentRevenueStatus.status,
      },
      where: {
        id: revenueId,
      },
    });

    await this.financeServices.updateStatusWithRevenue({
      revenueId,
      status: !currentRevenueStatus.status,
    });

    return messageGenerator('update');
  }

  async delete(id: string) {
    await this.exist(id);

    await this.prisma.revenue.delete({
      where: {
        id,
      },
    });

    return messageGenerator('delete');
  }

  async exist(id: string) {
    const revenue = await this.prisma.revenue.count({
      where: { id },
    });

    if (revenue) {
      return revenue;
    }

    throw new NotFoundException('Id de pagamento não encontrado!');
  }
}

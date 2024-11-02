import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { loyaltyPointsCheck, messageGenerator } from 'src/utils/function';
import { CreateRevenueAccountDTO } from './dto/create-revenue.dto';
import { FinanceType } from 'src/enums/financeTypes.enum';
import { FinanceService } from 'src/finance/finance.service';
import { CustomerService } from 'src/customer/customer.service';
import { TTypeCheck } from 'src/utils/types';

export interface IOrderInfo {
  customerId: string | null;
  orderInfo: {
    type: TTypeCheck;
    quantity: number;
  }[];
}

@Injectable()
export class RevenueService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly financeServices: FinanceService,
    private readonly customerServices: CustomerService,
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

    const overDueDate = new Date();

    overDueDate.setDate(overDueDate.getDate() + 1);

    await this.financeServices.createFinance({
      dueDate: overDueDate.toString(),
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

  async payRevenue({
    revenueId,
    orderInfo,
  }: {
    revenueId: string;
    orderInfo: IOrderInfo;
  }) {
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

    if (orderInfo.customerId) {
      const customer = await this.prisma.customer.findUnique({
        where: {
          id: orderInfo.customerId,
        },
      });

      if (customer.status) {
        await this.customerServices.incrementLoyaltyPoints({
          id: orderInfo.customerId,
          loyalty_points: loyaltyPointsCheck(orderInfo.orderInfo),
        });
      }
    }

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

  async deleteAll() {
    return this.prisma.order.deleteMany();
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

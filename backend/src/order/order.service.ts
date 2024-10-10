import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RevenueService } from 'src/revenue/revenue.service';
import { IOrderList } from './order.gateway';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly revenueService: RevenueService,
  ) {}

  async createOrder(order: CreateOrderDTO) {
    let value = 0;

    const newOrder = await this.prisma.order.create({
      data: {
        OrderItems: {
          create: order.OrderItems,
        },
        customerName: order.customerId || order.customerName,
      },
      include: {
        OrderItems: {
          include: {
            Menu: true,
          },
        },
      },
    });

    newOrder.OrderItems.map(({ Menu, quantity }) => {
      value += Menu.value * quantity;
    });

    await this.revenueService.createRevenueAccount({
      date: new Date(),
      value,
      orderId: newOrder.id,
      customerName: order.customerName,
      customerId: order.customerId,
    });
  }

  async FindAllOrder({ revenue, sequence }: IOrderList) {
    return this.prisma.order.findMany({
      include: {
        Revenue: {
          select: {
            id: true,
            status: true,
            value: true,
          },
        },
        OrderItems: {
          include: {
            Menu: true,
          },
        },
      },
      orderBy: {
        createdAt: sequence || undefined,
      },
      where: {
        Revenue: {
          status: revenue ? revenue === 'true' : undefined,
        },
      },
    });
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageGenerator } from 'src/utils/function';
import { IFindAllParam } from 'src/utils/types';
import { CreateFinanceDTO } from './dto/create-payable-account.dto copy';
import { UpdateFinanceDTO } from './dto/update-payable-account.dto copy 2';
import { Finance } from '@prisma/client';

interface IUpdateStatus {
  status: boolean;
  revenueId: string;
}

interface IFindFinanceParam extends IFindAllParam {
  status: string;
  type: string;
  initialDate: string;
  finalDate: string;
}

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllFinance({
    page,
    take,
    status,
    type,
    finalDate,
    initialDate,
  }: IFindFinanceParam) {
    if (page < 1)
      throw new BadRequestException('Seite muss größer als Null sein');

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    let finalDateEndOfDay = finalDate ? new Date(finalDate) : todayEnd;

    if (finalDate) {
      finalDateEndOfDay.setDate(finalDateEndOfDay.getDate() + 1);
    }

    const financeTableCount = await this.prisma.finance.count({
      where: {
        status:
          status === 'true' ? true : status === 'false' ? false : undefined,
        type: type || undefined,
        createdAt: {
          gte: initialDate ? new Date(initialDate) : todayStart,
          lte: finalDateEndOfDay,
        },
      },
    });

    const count = Math.ceil(financeTableCount / take);

    const finances = await this.prisma.finance.findMany({
      select: {
        createdAt: true,
        description: true,
        dueDate: true,
        id: true,
        Revenue: false,
        revenueId: false,
        status: true,
        type: true,
        value: true,
        userId: false,
        User: {
          select: {
            fullName: true,
          },
        },
      },
      take,
      skip: (page - 1) * take,
      where: {
        status:
          status === 'true' ? true : status === 'false' ? false : undefined,
        type: type || undefined,
        createdAt: {
          gte: initialDate ? new Date(initialDate) : todayStart,
          lte: finalDateEndOfDay,
        },
      },
    });


    await Promise.all(
      finances.map(async (finance) => {                
        if (!finance.status && finance.dueDate < new Date()) {
          await this.prisma.finance.update({
            data: {
              status: true,
            },
            where: {
              id: finance.id,
            },
          });
        }
      })
    );
  


    return { finances, financesCount: count };
  }

  async createFinance(
    { description, dueDate, status, value, type, revenueId }: CreateFinanceDTO,
    userId?: string,
  ) {
    await this.prisma.finance.create({
      data: {
        description,
        dueDate: new Date(dueDate),
        status,
        value,
        userId,
        type,
        revenueId,
      },
    });

    return messageGenerator('create');
  }

  async updateFinance({
    id,
    finance,
    userId,
  }: {
    id: string;
    finance: UpdateFinanceDTO;
    userId: string;
  }) {
    await this.existFinance(id);

    await this.prisma.finance.update({
      data: {
        ...finance,
        userId,
      },
      where: {
        id,
      },
    });

    return messageGenerator('update');
  }

  async delete(id: string) {
    await this.existFinance(id);

    await this.prisma.finance.delete({
      where: { id },
    });

    return messageGenerator('delete');
  }

  async updateStatusWithRevenue({ revenueId, status }: IUpdateStatus) {
    await this.prisma.finance.update({
      data: {
        status,
      },
      where: {
        revenueId,
      },
    });
  }

  async generalIncomeCalc({
    finalDate,
    initialDate,
  }: {
    initialDate: string;
    finalDate: string;
  }) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    let finalDateEndOfDay = finalDate ? new Date(finalDate) : todayEnd;

    if (finalDate) {
      finalDateEndOfDay.setDate(finalDateEndOfDay.getDate() + 1);
    }

    const allFinances = await this.prisma.finance.findMany({
      where: {
        createdAt: {
          gte: initialDate ? new Date(initialDate) : todayStart,
          lte: finalDateEndOfDay,
        },
      },
    });

    const income = this.calcIncome(allFinances);
    const expectedIncome = this.calcIncomeExpected(allFinances);

    return { income, expectedIncome };
  }

  calcIncome(finances: Finance[]) {
    let positive = 0;
    let negative = 0;

    finances.forEach((finance) => {
      if (finance.type === 'payable' && finance.status)
        negative += finance.value;

      if (finance.type === 'receivable' && finance.status)
        positive += finance.value;
    });

    return positive - negative;
  }

  calcIncomeExpected(finances: Finance[]) {
    let positive = 0;
    let negative = 0;

    finances.forEach((finance) => {
      if (finance.type === 'payable') negative += finance.value;

      if (finance.type === 'receivable') positive += finance.value;
    });

    return positive - negative;
  }

  async existFinance(id: string) {
    const receivable = await this.prisma.finance.count({
      where: { id },
    });

    if (receivable) {
      return receivable;
    }

    throw new NotFoundException('Id de conta não encontrado!');
  }
}

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

interface IUpdateStatus {
  status: boolean;
  revenueId: string;
}

interface IFindFinanceParam extends IFindAllParam {
  status: string;
  type: string;
}

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllFinance({ page, take, status, type }: IFindFinanceParam) {
    if (page < 1)
      throw new BadRequestException('Seite muss größer als Null sein');

    const financeTableCount = await this.prisma.finance.count({
      where: {
        status:
          status === 'true' ? true : status === 'false' ? false : undefined,
        type: type || undefined
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
      },
    });

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

  async calcIncome() {
    const allFinances = await this.prisma.finance.findMany()
    let positive = 0
    let negative = 0

    allFinances.forEach((finance) => {
      if(finance.type === 'payable' && finance.status) negative += finance.value

      if(finance.type === 'receivable' && finance.status) positive += finance.value
    })

    return {income: positive - negative};
  }

  async calcIncomeExpected() {
    const allFinances = await this.prisma.finance.findMany()
    let positive = 0
    let negative = 0

    allFinances.forEach((finance) => {
      if(finance.type === 'payable') negative += finance.value

      if(finance.type === 'receivable') positive += finance.value
    })

    return {expectedIncome: positive - negative};
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

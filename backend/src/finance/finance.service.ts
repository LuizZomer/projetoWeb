import { Injectable } from '@nestjs/common';
import { CreatePayableAccountDTO } from './dto/create/create-payable-account.dto copy';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageGenerator } from 'src/utils/function';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayableAccount(
    { description, dueDate, status, value }: CreatePayableAccountDTO,
    userId: string,
  ) {
    await this.prisma.accountPayable.create({
      data: {
        descrition: description,
        dueDate: dueDate,
        status: status,
        value: value,
        userId,
      },
    });

    return messageGenerator('create');
  }
}

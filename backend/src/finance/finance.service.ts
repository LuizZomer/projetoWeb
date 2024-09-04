import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageGenerator } from 'src/utils/function';
import { IFindAllParam } from 'src/utils/types';
import { CreateFinanceDTO } from './dto/create-payable-account.dto copy';
import { UpdateFinanceDTO } from './dto/update-payable-account.dto copy 2';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllFinance({page, take}: IFindAllParam){
    return this.prisma.finance.findMany({
      skip: page * take,
      take: take,
    })
  }

  async createFinance(
    {description, dueDate, status, value, type}: CreateFinanceDTO, 
    userId: string
  ) {
    await this.prisma.finance.create({
      data: {
        description,
        dueDate: new Date(dueDate),
        status,
        value,
        userId: userId,
        type
      }
    })

    return messageGenerator('create')
  }

  async updateFinance({id, finance, userId} : 
    {id: string, finance: UpdateFinanceDTO, userId: string}
  ) {
    await this.existFinance(id)

    await this.prisma.finance.update({
      data: {
        ...finance,
        userId
      },
      where: {
        id
      }
    }) 

    return messageGenerator('update')
  }

  async delete(id: string){
    await this.existFinance(id)

    await this.prisma.finance.delete({
      where: {id}
    })

    return messageGenerator('delete')
  }

  async existFinance(id: string){
    const receivable = await this.prisma.finance.count({
      where: {id}
    }) 

    if(receivable) {
      return receivable
    }

    throw new NotFoundException('Id de conta não encontrado!')
  }


}

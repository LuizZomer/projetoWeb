import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { IFindAllParam } from 'src/utils/types';
import { messageGenerator } from 'src/utils/function';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(customer: CreateCustomerDto) {
    const encryptedPassword = bcrypt.hashSync(
      customer.password,
      await bcrypt.genSalt(),
    );

    await this.prisma.customer.create({
      data: {
        ...customer,
        password: encryptedPassword,
      },
    });

    return messageGenerator('create');
  }

  async findAll({ page, take, search }: IFindAllParam) {
    const customerTableCount = await this.prisma.customer.count({
      where: {
        fullName: {
          contains: search || undefined,
        },
      },
    });

    const count = Math.ceil(customerTableCount / take);

    if (page >= count) throw new BadRequestException('Pagina não existente');

    const customers = await this.prisma.customer.findMany({
      select: {
        Contact: false,
        createdAt: true,
        fullName: true,
        id: true,
        idnr: true,
        loyalty_points: true,
        Order: false,
        OrderLog: false,
        password: false,
        Revenue: false,
        status: true,
        updateAt: false,
      },
      take,
      skip: page * take,
      where: {
        fullName: {
          contains: search || undefined,
        },
      },
    });

    return { customers, customersCount: count };
  }

  async findOne(id: string) {
    await this.exist(id);

    return this.prisma.customer.findUnique({
      select: {
        password: false,
        Contact: true,
        createdAt: true,
        email: true,
        fullName: true,
        id: true,
        idnr: true,
        loyalty_points: true,
        status: true,
      },
      where: {
        id,
      },
    });
  }

  async update(id: string, customer: UpdateCustomerDto) {
    await this.exist(id);

    if (customer.password)
      customer.password = bcrypt.hashSync(
        customer.password,
        await bcrypt.genSalt(),
      );

    await this.prisma.customer.update({
      data: customer,
      where: { id },
    });

    return messageGenerator('update');
  }

  async remove(id: string) {
    await this.exist(id);

    await this.prisma.customer.delete({
      where: {
        id,
      },
    });

    return messageGenerator('delete');
  }

  async exist(id: string) {
    const customer = await this.prisma.customer.count({
      where: {
        id,
      },
    });

    if (customer) {
      return true;
    }

    throw new NotFoundException('Id não existente');
  }
}

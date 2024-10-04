import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

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

    return { message: 'Conta criado com sucesso!' };
  }

  async findAll() {
    return this.prisma.customer.findMany({
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
    });
  }

  async findOne(id: string) {
    await this.exist(id);

    return this.prisma.customer.findUnique({
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

    return { message: 'Conta atualizada com sucesso!' };
  }

  async remove(id: string) {
    await this.exist(id);

    await this.prisma.customer.delete({
      where: {
        id,
      },
    });

    return { message: 'Conta apagada com sucesso' };
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

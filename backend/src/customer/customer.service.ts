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

interface ICustomerParam extends IFindAllParam {
  status: string;
}

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    email,
    fullName,
    idnr,
    password,
    status,
    loyalty_points,
  }: CreateCustomerDto) {
    await this.existEmail(email);

    const encryptedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(),
    );

    await this.prisma.customer.create({
      data: {
        email,
        fullName,
        idnr,
        loyalty_points: loyalty_points || 0,
        status,
        password: encryptedPassword,
      },
    });

    return messageGenerator('create');
  }

  async findAll({ page, take, search, status }: ICustomerParam) {
    if (page < 1)
      throw new BadRequestException('Seite muss größer als Null sein');

    const customerTableCount = await this.prisma.customer.count({
      where: {
        fullName: {
          contains: search || undefined,
        },
        status: {
          equals: status ? status === 'true' : undefined,
        },
      },
    });

    const count = Math.ceil(customerTableCount / take);

    const customers = await this.prisma.customer.findMany({
      select: {
        Contact: false,
        createdAt: true,
        email: true,
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
      skip: (page - 1) * take,
      where: {
        fullName: {
          contains: search || undefined,
        },
        status: {
          equals: status ? status === 'true' : undefined,
        },
      },
    });

    return { customers, customersCount: count };
  }

  async findOne(id: string) {
    await this.exist(id);

    return this.prisma.customer.findUnique({
      select:{
        loyalty_points: true,
        idnr: true,
        fullName: true,
        email: true,
        id: true,
        OrderLog: {
          select: {
            Order: {
              select:{
                id: true,
                Revenue:{
                  select:{
                   date: true,
                   value: true,
                   status: true 
                  }
                },
                OrderItems: {
                  include:{
                    Menu: {
                      select:{
                        description: true,
                         id: true,
                        name: true,
                       value: true,
                       type: true,
                       size: true  
                      }
                    },
                  }
                }
              }
            },
          },
        },        
      },
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    {
      email,
      fullName,
      idnr,
      loyalty_points,
      password,
      status,
    }: UpdateCustomerDto,
  ) {
    await this.exist(id);
    // await this.existEmail(email);

    const customer: UpdateCustomerDto = {
      email,
      fullName,
      idnr,
      loyalty_points,
      status,
    };

    if (password)
      customer.password = await bcrypt.hash(password, await bcrypt.genSalt());

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

  async existEmail(email: string) {
    const customer = await this.prisma.customer.count({
      where: {
        email,
      },
    });

    if (customer) throw new BadRequestException('Vorhandene E-Mail');

    return true;
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

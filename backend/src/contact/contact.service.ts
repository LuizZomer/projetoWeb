import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageGenerator } from 'src/utils/function';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customerService: CustomerService,
  ) {}

  async create(contact: CreateContactDto) {
    await this.customerService.exist(contact.customerId);

    await this.prisma.contact.create({
      data: contact,
    });

    return messageGenerator('create');
  }

  async update(id: string, contact: UpdateContactDto) {
    await this.customerService.exist(contact.customerId);

    await this.prisma.contact.update({
      data: contact,
      where: { id },
    });

    return messageGenerator('update');
  }

  async remove(id: string) {
    const existContact = await this.prisma.contact.count({
      where: {
        id,
      },
    });

    if (!existContact)
      throw new NotFoundException('Id de contato não existente');

    await this.prisma.contact.delete({
      where: { id },
    });

    return messageGenerator('delete');
  }
}

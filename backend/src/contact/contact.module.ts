import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerService } from 'src/customer/customer.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService, PrismaService, CustomerService],
})
export class ContactModule {}

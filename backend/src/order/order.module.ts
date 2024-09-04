import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderGateway } from './order.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [OrderService, OrderGateway, PrismaService],
})
export class OrderModule {}

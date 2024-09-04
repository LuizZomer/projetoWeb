import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService){}

    async createOrder(order: CreateOrderDTO){
        await this.prisma.order.create({
            data: order
        })
    }

    async FindAllOrder(){
        return this.prisma.order.findMany({
            orderBy:{
                createdAt: 'asc',
            }
        })
    }
}

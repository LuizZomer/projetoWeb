import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RevenueService } from 'src/revenue/revenue.service';

@Injectable()
export class OrderService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly revenueService: RevenueService
    ){}

    async createOrder(order: CreateOrderDTO){
        const newOrder = await this.prisma.order.create({
            data: order
        })        

        await this.revenueService.createRevenueAccount({
            date: new Date(),
            description: order.name,
            value: order.value,
            orderId: newOrder.id,
            customerName: order.customerName,
            customerId: order.customerId
        })
    }

    async FindAllOrder(){
        return this.prisma.order.findMany({
            include:{
                Revenue: {
                    select:{
                        id: true,
                        status: true,
                        value: true,
                        description: true,                        
                    }
                }
            },
            orderBy:{
                createdAt: 'asc',
            }
        })
    }
}

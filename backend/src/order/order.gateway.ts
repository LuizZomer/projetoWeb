import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { UsePipes, ValidationPipe } from "@nestjs/common";
import { OrderService } from "./order.service";

@WebSocketGateway({namespace: 'order'})
export class OrderGateway {
    constructor(private readonly orderService: OrderService){}

    @WebSocketServer() server: Server

    @SubscribeMessage('newOrder')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async handleNewOrder(client: Socket, @MessageBody() order: CreateOrderDTO){
        await this.orderService.createOrder(order)

        const orderList = await this.orderService.FindAllOrder()

        this.server.emit('newOrderList', orderList)
    }
}
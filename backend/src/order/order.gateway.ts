import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';

export interface IOrderList {
  sequence?: 'asc' | 'desc';
  revenue?: 'true' | 'false';
}

@WebSocketGateway({
  namespace: 'order',
  cors: {
    origin: '*',
  },
})
export class OrderGateway {
  constructor(private readonly orderService: OrderService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('newOrder')
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleNewOrder(@MessageBody() order: CreateOrderDTO) {
    await this.orderService.createOrder(order);

    this.server.emit('newOrderList');
  }
}

import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';

export interface IOrderList {
  sequence?: 'asc' | 'desc';
  revenue?: 'true' | 'false';
}

let backofficeFilter: IOrderList = {
  sequence: 'desc',
  revenue: 'false',
};

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

    const orderList = await this.orderService.FindAllOrder(backofficeFilter);
    this.server.emit('newOrderList', orderList);
  }

  @SubscribeMessage('newOrderList')
  async handleOrderList(@ConnectedSocket() client: Socket) {
    const { revenue, sequence } = client.handshake.query as any as IOrderList;

    backofficeFilter = {
      revenue,
      sequence,
    };

    client.emit(
      'newOrderList',
      await this.orderService.FindAllOrder({ revenue, sequence }),
    );
  }
}

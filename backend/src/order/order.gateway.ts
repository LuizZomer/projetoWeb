import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthService } from 'src/auth/auth.service';

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
  constructor(
    private readonly orderService: OrderService,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('newOrder')
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleNewOrder(
    @MessageBody() order: CreateOrderDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const token = client.handshake.headers['authorization']?.split(' ')[1];

    if (token && token !== 'null') {
      const isValid = this.authService.checkCustomerToken(token);

      if (isValid) {
        const customer = this.authService.checkCustomerToken(token);

        order.customerName = customer.name;
        order.customerId = customer.id;
      }
    }

    try {
      await this.orderService.createOrder(order);
      this.server.emit('newOrderList');
      client.emit('newOrderResponse', { success: true });
    } catch {
      client.emit('newOrderResponse', { success: false });
    }
  }
}

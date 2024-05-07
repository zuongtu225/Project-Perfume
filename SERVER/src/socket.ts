import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// Mục đích file này là  quản lý các kết nối real-time giữa máy chủ và clients  qua giao thức WebSocket.

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleEmitSocket({ data, event, to }) {
    if (event === 'message') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }
  }
  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'message', data);
  }
  @SubscribeMessage('renderStockProduct')
  async handleStock(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'renderStockProduct', data);
  }

  @SubscribeMessage('cancelOrder')
  async handleCancelOrder(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'cancelOrder', data);
  }

  sendToClient(clientId: string, event: string, data: any) {
    this.server.emit(event, data);
  }
  afterInit(socket: Socket): any {}
  async handleConnection(socket: Socket) {
    console.log('connect', socket.id);
  }
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnect', socket.id);
  }
}

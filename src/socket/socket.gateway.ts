import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer, SubscribeMessage } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Injectable, UseGuards } from "@nestjs/common";
import { MessageData, USER_STATUS_CHANGE, MessageType, AUTH_ERROR } from "./socket.events";
import { UserStatusEnums } from "../entities";
import { SocketAuthGuard, CustomSocket } from './socket.auth.guard';
import { KafkaService } from "../kafka/kafka.service";

@Injectable()
@WebSocketGateway({
  namespace: 'socket'
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;
  constructor(
    private readonly kafkaService: KafkaService
  ) {}

  getSocketQuery(socket: Socket) {
    return socket.handshake.query
  }

  handleAuthToken(socket: CustomSocket) {
    if (!socket.active) {
      socket.emit(AUTH_ERROR)
      return null
    } else {
      return socket.user
    }
  }

  async providerUserStatusChange(socket: Socket, status: UserStatusEnums) {
    const { tenant_id, user_id } = this.getSocketQuery(socket)
    if (!tenant_id || !user_id) {
      return
    }
    const messageData: MessageData = { event: USER_STATUS_CHANGE, type: MessageType.user, target: user_id as string, data: { status, tenant_id } }
    await this.kafkaService.sendConversationMessage(messageData)
    socket.broadcast.emit(USER_STATUS_CHANGE, messageData)
  }

  async handleConnection(socket: Socket) {
   await this.providerUserStatusChange(socket, UserStatusEnums.onLine)
  }

  async handleDisconnect(socket: Socket) {
    await this.providerUserStatusChange(socket, UserStatusEnums.offLine)
  }

  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('message')
  async handleMessage(socket: CustomSocket, data) {
    const authData = this.handleAuthToken(socket)
    if (!authData) return
    return authData
  }
}

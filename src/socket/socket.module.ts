import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { KafkaService } from "../kafka/kafka.service";

@Module({
  imports: [],
  providers: [SocketGateway, KafkaService]
})
export class SocketModule {}

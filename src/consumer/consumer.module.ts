import { Module } from '@nestjs/common';
import { ConversationConsumerService } from './conversation.consumer.service';
import { KafkaService } from "../kafka/kafka.service";
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [ConversationConsumerService, KafkaService, UserService]
})
export class ConsumerModule {}

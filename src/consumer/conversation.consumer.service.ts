import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { KafkaService } from "../kafka/kafka.service";
import { MessageData, USER_STATUS_CHANGE } from "../socket/socket.events";
import { UserService } from "../user/user.service";

@Injectable()
export class ConversationConsumerService implements OnModuleInit {
  private logger = new Logger('ConversationConsumerService');

  constructor(
    private readonly kafkaService: KafkaService,

    private readonly userService: UserService,
  ) {}

  async consumerUserStatusChange(result: MessageData) {
    const { target, data } = result;
    return await this.userService.updateUserStatus(target, data?.tenant_id, data?.status)
  }

  async routingMessage(data: MessageData) {
    const { event } = data;
    switch (event) {
      case USER_STATUS_CHANGE:
        await this.consumerUserStatusChange(data)
        break;
    }
  }

  async onModuleInit() {
    await this.kafkaService.consumerConversationMessage({
      eachMessage: async ({ message }) => {
        const messageData = JSON.parse(message.value.toString()) as MessageData
        this.logger.log(`consumer conversation messages: ${message.value.toString()}`)
        await this.routingMessage(messageData)
      }
    })
  }
}

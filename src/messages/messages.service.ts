import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthData } from "../auth/auth.jwt.strategy";
import { MessagesEntity, MessagesEntityWithFromUserEntity } from '../entities'
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messagesRepository: Repository<MessagesEntity>,

    private readonly userService: UserService,
  ) {}

  async findByConversationId(conversationId: string, authData: AuthData) {
    const messages = await this.messagesRepository.find({ tenant_id: +authData.tenant_id, conversation_id: +conversationId })
    const fromUsers = await this.userService.findByIds(messages.map(r => r.from_user_id), authData.tenant_id);
    const resultMessages: MessagesEntityWithFromUserEntity[] = []

    for (let i = 0; i < messages.length; i++) {
      const record = messages[i]
      const findFormUserEntity = fromUsers.find(r => r.id + '' === record.from_user_id + '')
      resultMessages.push({
        ...record,
        from_user_name: findFormUserEntity?.user_name || '',
        from_user_metadata: findFormUserEntity || undefined,
      })
    }

    return resultMessages;
  }
}

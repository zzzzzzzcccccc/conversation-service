import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConversationsEntity,
  ConversationTargetTypeEnums,
  ConversationsWhitTargetEntity,
  RoomsEntity,
  UserEntity
} from "../entities";
import { Repository } from 'typeorm';
import { UserService } from "../user/user.service";
import { RoomsService } from "../rooms/rooms.service";
import { AuthData } from "../auth/auth.jwt.strategy";

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(ConversationsEntity)
    private readonly conversationsRepository: Repository<ConversationsEntity>,

    private readonly userService: UserService,

    private readonly roomsService: RoomsService
  ) {}

  targetNameByRoomsUsers(conversation: Partial<ConversationsEntity>, rooms: Partial<RoomsEntity>[], users: Partial<UserEntity>[]) {
    const targetTypeMapper = {
      [ConversationTargetTypeEnums.user]: {
        data: users,
        outputField: 'user_name'
      },
      [ConversationTargetTypeEnums.room]: {
        data: rooms,
        outputField: 'room_name'
      }
    }
    const targetTypeRecord = targetTypeMapper[conversation.target_type]

    if (!targetTypeRecord) {
      return {
        target_name: ''
      }
    }

    const record: UserEntity | RoomsEntity = targetTypeRecord.data.find(r => (r.id + '') === (conversation.target_id + ''))

    return {
      target_metadata: record,
      target_name: record[targetTypeRecord].outputField || ''
    }
  }

  async findByUserId(authData: AuthData) {
    const conversations = await this.conversationsRepository.find({ user_id: +authData.id, tenant_id: +authData.tenant_id })

    const roomIds = conversations.filter(record => record.target_type === ConversationTargetTypeEnums.room).map(r => r.target_id);
    const userIds = conversations.filter(record => record.target_type === ConversationTargetTypeEnums.user).map(r => r.target_id);

    const rooms = await this.roomsService.findByRoomIds(roomIds, authData.tenant_id)
    const users = await this.userService.findByIds(userIds, authData.tenant_id)

    let conversationsWhitTargetNameEntityList: ConversationsWhitTargetEntity[] = []

    for (let i = 0; i < conversations.length; i++) {
      const conversationRecord = conversations[i]
      conversationsWhitTargetNameEntityList = [...conversationsWhitTargetNameEntityList, {
        ...conversationRecord,
        ...this.targetNameByRoomsUsers(conversationRecord, rooms, users)
      }]
    }

    return conversationsWhitTargetNameEntityList;
  }
}

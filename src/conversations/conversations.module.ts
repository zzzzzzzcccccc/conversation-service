import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsEntity, RoomsEntity, UserEntity } from "../entities";
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { RoomsService } from '../rooms/rooms.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationsEntity, RoomsEntity, UserEntity])],
  controllers: [ConversationsController],
  providers: [ConversationsService, RoomsService, UserService]
})
export class ConversationsModule {}

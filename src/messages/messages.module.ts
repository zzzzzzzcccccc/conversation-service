import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity, MessagesEntity } from "../entities";
import { ConversationsService } from "../conversations/conversations.service";
import { UserService } from "../user/user.service";
import { MessagesController } from "./messages.controller";

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity, UserEntity])],
  controllers: [MessagesController],
  providers: [ConversationsService, MessagesService, UserService]
})
export class MessagesModule {}

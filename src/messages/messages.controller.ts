import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { MessagesService } from './messages.service'

@ApiTags('conversations')
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':conversationId')
  findByConversationId(@Param('conversationId') conversationId: string, @Request() req) {
    return this.messagesService.findByConversationId(conversationId, req.user)
  }
}

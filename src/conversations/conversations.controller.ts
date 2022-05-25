import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConversationsService } from "./conversations.service";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  findByUserId(@Request() req) {
    return this.conversationsService.findByUserId(req.user)
  }
}

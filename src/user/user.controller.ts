import { Controller, Post, Body, Get, Param, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport'
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/user';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param('id') id: string, @Request() req) {
    return this.userService.findById(id, req.user)
  }
}

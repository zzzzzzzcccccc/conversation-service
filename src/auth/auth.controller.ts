import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LogoAuthDto } from '../dto/auth';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/login')
  login(@Body() logoAuthDto: LogoAuthDto) {
    return this.authService.login(logoAuthDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  profile(@Request() req) {
    return this.authService.profile(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/refresh-token')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user)
  }
}

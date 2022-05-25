import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, TenantEntity } from '../entities';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthJwtStrategy } from './auth.jwt.strategy';
import { UserService } from "../user/user.service";
import { TenantService } from "../tenant/tenant.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TenantEntity]),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRES
          }
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, AuthJwtStrategy, UserService, TenantService],
  controllers: [AuthController]
})
export class AuthModule {}

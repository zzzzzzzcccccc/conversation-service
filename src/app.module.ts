import { join } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { ServeStaticModule } from "@nestjs/serve-static";

import { TypeOrmModule } from "@nestjs/typeorm";
import { KafkaModule } from './kafka/kafka.module';
import { ConsumerModule } from './consumer/consumer.module';
import { SocketModule } from "./socket/socket.module";
import { UserModule } from "./user/user.module";
import { UserRoleModule } from "./user-role/user-role.module";
import { TenantModule } from "./tenant/tenant.module";
import { AuthModule } from "./auth/auth.module";
import { ConversationsModule } from './conversations/conversations.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomDetailsModule } from './room-details/room-details.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*']
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'mysql',
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [join(__dirname, process.env.DATABASE_ENTITIES)],
          logging: process.env.DATABASE_LOGGING === 'true',
          synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
          retryAttempts: 10,
          autoLoadEntities: false,
          keepConnectionAlive: false,
          retryDelay: 3000,
        }
      },
      inject: [ConfigService]
    }),
    KafkaModule,
    ConsumerModule,
    SocketModule,
    UserModule,
    UserRoleModule,
    TenantModule,
    AuthModule,
    ConversationsModule,
    RoomsModule,
    RoomDetailsModule,
    MessagesModule
  ]
})
export class AppModule {}

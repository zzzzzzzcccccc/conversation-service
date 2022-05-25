import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsEntity } from "../entities";

@Module({
  imports: [TypeOrmModule.forFeature([RoomsEntity])],
  providers: [RoomsService],
  controllers: [RoomsController]
})
export class RoomsModule {}

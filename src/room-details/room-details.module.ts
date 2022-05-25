import { Module } from '@nestjs/common';
import { RoomDetailsService } from './room-details.service';

@Module({
  providers: [RoomDetailsService]
})
export class RoomDetailsModule {}

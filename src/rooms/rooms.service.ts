import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomsEntity)
    private readonly roomsRepository: Repository<RoomsEntity>
  ) {}

  async findByRoomIds(roomIds: number[], tenantId: string | number) {
    return await this.roomsRepository.findByIds(roomIds, { tenant_id: +tenantId })
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { RoomDetailsService } from './room-details.service';

describe('RoomDetailsService', () => {
  let service: RoomDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomDetailsService],
    }).compile();

    service = module.get<RoomDetailsService>(RoomDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RoomDetailsController } from './room-details.controller';

describe('RoomDetailsController', () => {
  let controller: RoomDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomDetailsController],
    }).compile();

    controller = module.get<RoomDetailsController>(RoomDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

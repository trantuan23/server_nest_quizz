import { Test, TestingModule } from '@nestjs/testing';
import { AudioguessesController } from './audioguesses.controller';

describe('AudioguessesController', () => {
  let controller: AudioguessesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AudioguessesController],
    }).compile();

    controller = module.get<AudioguessesController>(AudioguessesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

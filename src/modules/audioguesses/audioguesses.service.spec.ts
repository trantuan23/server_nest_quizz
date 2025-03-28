import { Test, TestingModule } from '@nestjs/testing';
import { AudioguessesService } from './audioguesses.service';

describe('AudioguessesService', () => {
  let service: AudioguessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudioguessesService],
    }).compile();

    service = module.get<AudioguessesService>(AudioguessesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

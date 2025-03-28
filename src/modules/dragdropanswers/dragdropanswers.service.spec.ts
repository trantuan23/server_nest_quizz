import { Test, TestingModule } from '@nestjs/testing';
import { DragDropAnswersService } from './dragdropanswers.service';

describe('DragDropAnswersService', () => {
  let service: DragDropAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DragDropAnswersService],
    }).compile();

    service = module.get<DragDropAnswersService>(DragDropAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

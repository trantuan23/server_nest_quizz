import { Test, TestingModule } from '@nestjs/testing';
import { DragDropAnswersController } from './dragdropanswers.controller';

describe('DragDropAnswersController', () => {
  let controller: DragDropAnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DragDropAnswersController],
    }).compile();

    controller = module.get<DragDropAnswersController>(DragDropAnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

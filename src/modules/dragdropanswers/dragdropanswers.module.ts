import { Module } from '@nestjs/common';
import { DragDropAnswersController } from './dragdropanswers.controller';
import { DragDropAnswersService } from './dragdropanswers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from '../questions/entities/question.entities';
import { DragDropAnswers } from './entities/dragdropanswer.entity/dragdropanswer.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Questions,DragDropAnswers])],
  controllers: [DragDropAnswersController],
  providers: [DragDropAnswersService]
})
export class DragDropAnswersModule {}

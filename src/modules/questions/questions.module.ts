import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './entities/question.entities';
import { Quizzes } from '../quizzes/entities/quizzes.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Questions,Quizzes])],
  providers: [QuestionsService],
  controllers: [QuestionsController]
})
export class QuestionsModule {}

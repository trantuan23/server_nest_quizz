import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answers } from './entities/answers.entities';
import { Questions } from '../questions/entities/question.entities';

@Module({
  imports:[TypeOrmModule.forFeature([Answers,Questions])],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}

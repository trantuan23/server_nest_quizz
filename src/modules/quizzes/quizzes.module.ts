import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quizzes } from './entities/quizzes.entity';
import { Users } from '../users/entities/user.entity';
import { Classes } from '../classes/entities/classes.entity';
import { Subjects } from '../subjects/entities/subject.entity';
import { Answers } from '../answers/entities/answers.entities';

@Module({
  imports:[TypeOrmModule.forFeature([Quizzes,Users,Classes,Subjects])],
  providers: [QuizzesService],
  controllers: [QuizzesController]
})
export class QuizzesModule {}

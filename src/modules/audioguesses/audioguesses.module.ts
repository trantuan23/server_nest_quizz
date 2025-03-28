import { Module } from '@nestjs/common';
import { AudioguessesService } from './audioguesses.service';
import { AudioguessesController } from './audioguesses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from '../questions/entities/question.entities';
import { AudioGuesses } from './entities/audioguesses.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Questions, AudioGuesses])],
  providers: [AudioguessesService],
  controllers: [AudioguessesController]
})
export class AudioGuessesModule { }

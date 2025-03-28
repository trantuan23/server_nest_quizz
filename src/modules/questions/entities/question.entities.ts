// src/questions/questions.entity.ts
import { Answers } from '@/modules/answers/entities/answers.entities';
import { AudioGuesses } from '@/modules/audioguesses/entities/audioguesses.entity';
import { DragDropAnswers } from '@/modules/dragdropanswers/entities/dragdropanswer.entity/dragdropanswer.entity';
import { Quizzes } from '@/modules/quizzes/entities/quizzes.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  DRAG_DROP = 'drag_drop',
  AUDIO_GUESS = 'audio_guess',
}

@Entity()
export class Questions {
  @PrimaryGeneratedColumn('uuid')
  question_id: string;

  @ManyToOne(() => Quizzes, (quizz) => quizz.questions, { onDelete: 'CASCADE' })
  quizz: Quizzes;

  @Column({ type: 'text' })
  question_text: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  question_type: QuestionType;

  @Column({ length: 255, nullable: true })
  media_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Answers, (answer) => answer.question)
  answers: Answers[];

  @OneToMany(() => DragDropAnswers, (dda) => dda.question)
  drag_drop_answers: DragDropAnswers[];

  @OneToMany(() => AudioGuesses, (ag) => ag.question)
  audio_guesses: AudioGuesses[];



}
// src/audio-guesses/audio-guesses.entity.ts
import { Questions } from '@/modules/questions/entities/question.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class AudioGuesses {
  @PrimaryGeneratedColumn("uuid")
  audio_guess_id: string;

  @Column({ length: 255 })
  correct_guess: string;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Questions, (question) => question.audio_guesses, { onDelete: 'CASCADE' })
  question: Questions;
}

import { Quizzes } from '@/modules/quizzes/entities/quizzes.entity';
import { Subjects } from '@/modules/subjects/entities/subject.entity';
import { Users } from '@/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('results')
export class Results {
  @PrimaryGeneratedColumn('uuid')
  result_id: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  score: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  completed_at: Date;


  @ManyToOne(() => Users, (user) => user.results, { onDelete: 'CASCADE' })
  user: Users;


  @ManyToOne(() => Subjects, (subject) => subject.results)
  subject: Subjects;

  @ManyToOne(() => Quizzes, (quiz) => quiz.results,{ onDelete: 'CASCADE' })
  quizzes: Quizzes;

  // New column to store all answer_id's in an array
  @Column('json', { nullable: true })
  answer_ids: string[];  // Array of answer_ids
}

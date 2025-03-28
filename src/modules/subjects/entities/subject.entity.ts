import { Quizzes } from '@/modules/quizzes/entities/quizzes.entity';
import { Results } from '@/modules/results/entities/results.entity/results.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class Subjects {
  @PrimaryGeneratedColumn('uuid')
  subject_id: string;

  @Column({ length: 100 })
  subject_name: string;


  @OneToMany(() => Subjects, (subject) => subject.quizzes)
  quizzes: Quizzes[];

  @OneToMany(() => Subjects, (subject) => subject.quizzes)
  results: Results[];



}
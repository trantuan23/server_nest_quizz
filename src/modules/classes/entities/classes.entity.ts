import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Users } from '@/modules/users/entities/user.entity';
import { Quizzes } from '@/modules/quizzes/entities/quizzes.entity';

@Entity()
export class Classes {
  @PrimaryGeneratedColumn('uuid')
  class_id: string;

  @Column({ length: 100 })
  class_name: string;

  @OneToMany(() => Quizzes, (quiz) => quiz.classes)
  quizzes: Quizzes[];

  @OneToMany(() => Users, (user) => user.class)
  user: Users[];
}

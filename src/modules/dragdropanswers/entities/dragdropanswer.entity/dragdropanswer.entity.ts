import { Questions } from '@/modules/questions/entities/question.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class DragDropAnswers {
  @PrimaryGeneratedColumn('uuid')
  dragDropAnswer_id: string;

  @Column({ type: 'json' })
  correct_order: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Questions, (question) => question.drag_drop_answers, { onDelete: 'CASCADE' })
  question: Questions;
}

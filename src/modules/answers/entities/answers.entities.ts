import { Questions } from '@/modules/questions/entities/question.entities';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Answers {
    @PrimaryGeneratedColumn('uuid')
    answer_id: string;

    @Column({ type: 'text', nullable: true })
    answer_text: string;

    @Column({ type: 'boolean', nullable: true })
    is_correct: boolean;

    @Column({ type: 'text', nullable: true })
    reason: string | null;  // Đảm bảo lý do có thể là null khi đáp án sai

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    submitted_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Questions, (question) => question.answers, { onDelete: 'CASCADE' })
    question: Questions;
}


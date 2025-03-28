import { Classes } from "@/modules/classes/entities/classes.entity";
import { Quizzes } from "@/modules/quizzes/entities/quizzes.entity";
import { Results } from "@/modules/results/entities/results.entity/results.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher',
    ADMIN = 'admin',
}
@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ length: 50 })
    username: string;

    @Column({ length: 100 })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
    })
    @Column({ type: 'enum', enum: UserRole }) // Hoặc { type: 'varchar' }
    role: UserRole;

    @Column({ default: false })
    isActive: boolean;

    @Column({ nullable: true }) // Token có thể null
    refresh_token: string;

    @Column({ nullable: true })
    code_otp: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;


    @OneToMany(() => Quizzes, (quiz) => quiz.user)
    quizzes: Quizzes[];

  
    @OneToMany(() => Results, (result) => result.user, { cascade: true, onDelete: 'CASCADE' })
    results: Results[];


    @ManyToOne(() => Classes, (cls) => cls.user, { nullable: true })
    class: Classes;

}

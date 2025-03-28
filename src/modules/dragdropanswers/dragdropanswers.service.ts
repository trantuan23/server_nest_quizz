import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DragDropAnswers } from './entities/dragdropanswer.entity/dragdropanswer.entity';
import { Repository } from 'typeorm';
import { Questions } from '../questions/entities/question.entities';
import { CreateDragDropAnswerDto } from './entities/dto/create.dto';
import { UpdateDragDropAnswerDto } from './entities/dto/update.dto';

@Injectable()
export class DragDropAnswersService {
    constructor(
        @InjectRepository(DragDropAnswers)
        private dragDropAnswerRepository: Repository<DragDropAnswers>,
        @InjectRepository(Questions)
        private questionRepository: Repository<Questions>,
    ) {}

    async create(creatDrag: CreateDragDropAnswerDto): Promise<{ message: string, data: DragDropAnswers }> {
        const question = await this.questionRepository.findOne({ where: { question_id: creatDrag.questionId } });

        if (!question) {
            throw new Error("Question not found"); // Kiểm tra nếu câu hỏi không tồn tại
        }

        const drag = this.dragDropAnswerRepository.create({
            ...creatDrag,
            question,  // Sử dụng đúng tên quan hệ là 'question'
        });

        const savedDrag = await this.dragDropAnswerRepository.save(drag);

        return {
            message: 'Tạo câu trả lời kéo thả thành công!',
            data: savedDrag,
        };
    }

    async findAll(): Promise<{ message: string, data: DragDropAnswers[] }> {
        const dragDropAnswers = await this.dragDropAnswerRepository.find({ relations: ['question'] });
        return {
            message: 'Lấy danh sách câu trả lời kéo thả thành công!',
            data: dragDropAnswers,
        };
    }

    async findOne(id: string): Promise<{ message: string, data: DragDropAnswers }> {
        const dragDropAnswer = await this.dragDropAnswerRepository.findOne({
            where: { dragDropAnswer_id: id },
            relations: ['question'],
        });

        if (!dragDropAnswer) {
            throw new Error(`Không tìm thấy câu trả lời kéo thả với ID: ${id}`);
        }

        return {
            message: 'Lấy thông tin câu trả lời kéo thả thành công!',
            data: dragDropAnswer,
        };
    }

    async update(id: string, updateDrag: UpdateDragDropAnswerDto): Promise<{ message: string, data: DragDropAnswers }> {
        await this.dragDropAnswerRepository.update(id, updateDrag);
        const updatedDrag = await this.findOne(id);
        return {
            message: 'Cập nhật câu trả lời kéo thả thành công!',
            data: updatedDrag.data,
        };
    }

    async remove(id: string): Promise<{ message: string }> {
        await this.dragDropAnswerRepository.delete(id);
        return {
            message: 'Xoá câu trả lời kéo thả thành công!',
        };
    }
}

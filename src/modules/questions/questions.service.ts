import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions, QuestionType } from './entities/question.entities';
import { Repository } from 'typeorm';
import { Quizzes } from '../quizzes/entities/quizzes.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Questions)
        private questionRepository: Repository<Questions>,
        @InjectRepository(Quizzes)
        private quizRepository: Repository<Quizzes>
    ) { }

    async create(createQuestionDto: CreateQuestionDto): Promise<{ message: string; data: Questions }> {
        const quiz = await this.quizRepository.findOne({ where: { quizz_id: createQuestionDto.quizzId } });

        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${createQuestionDto.quizzId} not found`);
        }

        const formattedQuestionText = createQuestionDto.question_text.trim().toLowerCase();

        const existingQuestion = await this.questionRepository.findOne({
            where: {
                question_text: formattedQuestionText,
                quizz: quiz,
            },
        });

        if (existingQuestion) {
            throw new ConflictException(`A question with the same content already exists in this quiz.`);
        }



        const question = this.questionRepository.create({
            ...createQuestionDto,
            question_text: formattedQuestionText,

            quizz: quiz,
        });

        try {
            const savedQuestion = await this.questionRepository.save(question);
            return {
                message: 'Tạo câu hỏi thành công!',
                data: savedQuestion,
            };
        } catch (error) {
            throw new InternalServerErrorException('Không thể tạo câu hỏi. ' + error.message);
        }
    }


    async findAll(): Promise<{ message: string, data: Questions[] }> {
        const questions = await this.questionRepository.find({ relations: ['quizz','answers'] });

        if (questions.length === 0) {
            throw new NotFoundException('Không có câu hỏi nào.');
        }

        return {

            message: 'Lấy danh sách câu hỏi thành công!',
            data: questions
        };
    }

    async findOne(id: string): Promise<{ message: string, data: Questions }> {
        const question = await this.questionRepository.findOne({ where: { question_id: id }, relations: ['quizz'] });

        if (!question) {
            throw new NotFoundException(`Không tìm thấy câu hỏi có ID: ${id}`);
        }

        return {

            message: 'Lấy thông tin câu hỏi thành công!',
            data: question
        };
    }

    async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<{ message: string, data: Questions }> {
        const question = await this.findOne(id);
    
        if (!question) {
            throw new NotFoundException(`Không tìm thấy câu hỏi có ID: ${id}`);
        }
    
        // Kiểm tra question_type và xử lý media_url
        if (updateQuestionDto.question_type === QuestionType.MULTIPLE_CHOICE) {
            updateQuestionDto.media_url = null;  // Đặt media_url thành null nếu loại câu hỏi là multiple_choice
        }
    
        try {
            // Cập nhật câu hỏi
            await this.questionRepository.update(id, updateQuestionDto);
            const updatedQuestion = await this.findOne(id);
            
            return {
                message: 'Cập nhật câu hỏi thành công!',
                data: updatedQuestion.data
            };
        } catch (error) {
            throw new InternalServerErrorException('Cập nhật câu hỏi không thành công. ' + error.message);
        }
    }
    
    async remove(id: string): Promise<{ message: string }> {
        const question = await this.findOne(id);

        if (!question) {
            throw new NotFoundException(`Không tìm thấy câu hỏi có ID: ${id}`);
        }

        try {
            await this.questionRepository.delete(id);
            return {

                message: 'Xoá câu hỏi thành công!'
            };
        } catch (error) {
            throw new InternalServerErrorException('Không thể xoá câu hỏi này. ' + error.message);
        }
    }
}

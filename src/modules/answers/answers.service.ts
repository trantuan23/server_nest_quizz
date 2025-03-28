import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answers } from './entities/answers.entities';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Questions } from '../questions/entities/question.entities';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answers)
        private answersRepository: Repository<Answers>,
     
        @InjectRepository(Questions)
        private questionRepository: Repository<Questions>
    ) {}

    async create(createAnswerDto: CreateAnswerDto[]): Promise<{ message: string; data: Answers[] }> {
        if (!createAnswerDto || createAnswerDto.length === 0) {
            throw new BadRequestException('No answers provided!');
        }
    
        // Lấy questionId từ đáp án đầu tiên (giả sử tất cả đều cùng 1 questionId)
        const questionId = createAnswerDto[0].questionId;
        const question = await this.questionRepository.findOne({
            where: { question_id: questionId },
        });
    
        if (!question) {
            throw new BadRequestException('Question not found!');
        }
    
        // Tạo danh sách đáp án
        const answersToSave = createAnswerDto.map((dto) => {
            const { is_correct, reason } = dto;
    
            // Nếu đáp án sai thì reason có thể là null
            const answerReason = is_correct ? reason : null;
    
            return this.answersRepository.create({
                ...dto,
                reason: answerReason,  // Đảm bảo lý do chỉ được lưu khi đáp án đúng
                question,
            });
        });
    
        // Lưu tất cả đáp án vào cơ sở dữ liệu
        const savedAnswers = await this.answersRepository.save(answersToSave);
    
        return {
            message: 'Tạo các câu trả lời thành công!',
            data: savedAnswers,
        };
    }
    
    

    async findAll(): Promise<{ message: string; data: Answers[] }> {
        const answers = await this.answersRepository.find({
          relations: ['question.quizz'],
        });
      
        // Sắp xếp các câu trả lời theo created_at (cũ nhất trước)
        const sortedAnswers = answers.sort((a, b) => {
      
          // Sắp xếp theo thứ tự A, B, C, D từ answer_text
          const answerOrder = ['A', 'B', 'C', 'D'];
          const orderA = answerOrder.indexOf(a.answer_text.charAt(0));
          const orderB = answerOrder.indexOf(b.answer_text.charAt(0));
          return orderA - orderB;
        });
      
        return {
          message: 'Lấy danh sách câu trả lời thành công!',
          data: sortedAnswers,
        };
      }
      
    

    async findOne(id: string): Promise<{ message: string; data: Answers }> {
        const answer = await this.answersRepository.findOne({ where: { answer_id: id }, relations: ['question.answers'] }); // Xóa 'user'
        if (!answer) {
            throw new BadRequestException('Answer not found!');
        }
        return {
            message: 'Lấy thông tin câu trả lời thành công!',
            data: answer,
        };
    }
    

    async update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<{ message: string; data: Answers }> {
        await this.answersRepository.update(id, updateAnswerDto);
        const updatedAnswer = await this.findOne(id);
        return {
            message: 'Cập nhật câu trả lời thành công!',
            data: updatedAnswer.data,
        };
    }
    

    async remove(id: string): Promise<{ message: string }> {
        await this.findOne(id); // Kiểm tra nếu Answer tồn tại
        await this.answersRepository.delete(id);
        return {
            message: 'Xoá câu trả lời thành công!',
        };
    }
}


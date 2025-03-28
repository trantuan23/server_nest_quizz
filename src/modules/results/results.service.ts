import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Results } from './entities/results.entity/results.entity';
import { In, Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { Subjects } from '../subjects/entities/subject.entity';
import { Quizzes } from '../quizzes/entities/quizzes.entity';
import { Answers } from '../answers/entities/answers.entities';

@Injectable()
export class ResultsService {
  constructor(

    @InjectRepository(Results)
    private resultReponsitory: Repository<Results>,
    @InjectRepository(Users)
    private userReponsitory: Repository<Users>,
    @InjectRepository(Subjects)
    private subjectReponsitory: Repository<Subjects>,
    @InjectRepository(Quizzes)
    private quizzesReponsitory: Repository<Quizzes>,
    @InjectRepository(Answers)
    private answerReponsitory: Repository<Answers>,


  ) { }

  async create(createResultDto: CreateResultDto): Promise<Results> {
    try {
      const user = await this.userReponsitory.findOne({ where: { user_id: createResultDto.userId } });
      if (!user) {
        throw new Error('User not found');
      }

      const quizzes = await this.quizzesReponsitory.findOne({ where: { quizz_id: createResultDto.quizId } });
      if (!quizzes) {
        throw new Error('Quizz not found');
      }

      const subject = await this.subjectReponsitory.findOne({ where: { subject_id: createResultDto.subjectId } });
      if (!subject) {
        throw new Error('Subject not found');
      }

      let correctAnswersCount = 0;
      let totalQuestionsCount = 0;

      const answer_ids = createResultDto.answers.map(answer => {
        totalQuestionsCount++; // Tính tổng số câu hỏi

        if (answer.selected_answer && answer.selected_answer.answer_id) {
          // Kiểm tra nếu câu trả lời được chọn
          if (answer.selected_answer.is_correct) {
            correctAnswersCount++; // Cộng vào số câu trả lời đúng
          }
          return answer.selected_answer.answer_id; // Lưu answer_id
        } else {
          // Nếu không chọn đáp án, lưu là null
          return null;
        }
      });

      // Tính điểm
      const score = totalQuestionsCount > 0 ? (correctAnswersCount / totalQuestionsCount) * 100 : 0;

      const result = this.resultReponsitory.create({
        score,
        user,
        quizzes,
        subject,
        answer_ids, // Lưu cả các câu trả lời chưa chọn (null)
      });

      return await this.resultReponsitory.save(result);
    } catch (error) {
      throw new Error(`Failed to create result: ${error.message}`);
    }
  }



  async findAll(): Promise<Results[]> {
    return this.resultReponsitory.find({
      relations: ['user', 'quizzes'], select: {
        // Chỉ lấy thông tin user với trường username
        user: { username: true },
      },
    })
  }

  async findOne(id: string): Promise<any> {
    // Lấy thông tin kết quả từ bảng Results
    const result = await this.resultReponsitory.findOne({
      where: { result_id: id },
      relations: ['quizzes.questions.answers', 'user.class'],
      select: {
        // Chỉ lấy thông tin user với trường username
        user: { username: true }
      },
      order: {
        quizzes: {
          questions: {
            created_at: 'ASC', // Sắp xếp câu hỏi theo thứ tự thời gian tạo cũ nhất
          },
        },
      },
    });

    if (!result) {
      throw new Error(`Result with id ${id} not found`);
    }

    // Sắp xếp đáp án theo thứ tự A, B, C, D
    const answerOrder = ['A', 'B', 'C', 'D'];

    result.quizzes.questions.forEach((question) => {
      if (question.answers && question.answers.length > 0) {
        question.answers.sort((a, b) => {
          // Lấy chỉ số trong mảng `answerOrder` để so sánh
          const orderA = answerOrder.indexOf(a.answer_text.charAt(0));
          const orderB = answerOrder.indexOf(b.answer_text.charAt(0));
          return orderA - orderB;
        });
      }
    });

    // Lấy danh sách `answer_ids` từ kết quả
    const { answer_ids } = result;

    // Truy vấn để lấy danh sách câu trả lời (answers) dựa trên `answer_ids`
    const selectedAnswers = await this.answerReponsitory.find({
      where: {
        answer_id: In(answer_ids),
      },
      order: {
        created_at: 'ASC', // Sắp xếp theo thời gian tạo cũ nhất
      },
    });

    // Gắn thông tin câu trả lời đã chọn (đã sắp xếp) vào kết quả
    return {
      ...result,
      selectedAnswers,
    };
  }


  async getResultStatisticsByDate(startDate: string, endDate: string): Promise<{ date: string; count: number }[]> {
    const users = await this.resultReponsitory.createQueryBuilder("result")
      .select("DATE(result.completed_at)", "date")
      .addSelect("COUNT(result.result_id)", "count")
      .where("result.completed_at BETWEEN :startDate AND :endDate", { startDate, endDate })
      .groupBy("DATE(result.completed_at)")
      .orderBy("date", "ASC")
      .getRawMany();

    return users.map(user => ({
      date: user.date,
      count: parseInt(user.count, 10)
    }));
  }

  async getResultTotal(): Promise<{ totalResult: number }> {
    const totalResult = await this.resultReponsitory.count();
    return { totalResult };
  }


  async remove(id: string): Promise<void> {
    await this.resultReponsitory.delete(id)
  }
}

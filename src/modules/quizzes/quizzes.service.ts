import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Quizzes } from './entities/quizzes.entity';
import { Users } from '@/modules/users/entities/user.entity';
import { UpdateQuizDto } from './dto/update-quizz.dto';
import { Classes } from '../classes/entities/classes.entity';
import { Subjects } from '../subjects/entities/subject.entity';
import { CreateQuizDto } from './dto/create-quizz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quizzes)
    private readonly quizzesRepository: Repository<Quizzes>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    @InjectRepository(Classes)
    private readonly classReponsitory: Repository<Classes>,

    @InjectRepository(Subjects)
    private readonly subjectReponsitory: Repository<Subjects>
  ) { }

  async create(createQuizDto: CreateQuizDto): Promise<{ message: string; data: Quizzes }> {
    try {
      // Kiểm tra user
      const user = await this.usersRepository.findOne({
        where: { user_id: createQuizDto.userId },
      });
      if (!user) {
        throw new BadRequestException({
          message: `User với ID ${createQuizDto.userId} không tồn tại.`,
          code: 'USER_NOT_FOUND',
        });
      }
  
      // Kiểm tra môn học (subject)
      const subject = await this.subjectReponsitory.findOne({
        where: { subject_id: createQuizDto.subjectId },
      });
  
      if (!subject) {
        throw new BadRequestException({
          message: `Môn học với ID ${createQuizDto.subjectId} không tồn tại!`,
          code: 'SUB_NOT_FOUND',
        });
      }
  
      // Kiểm tra danh sách lớp học (classes)
      const classIds = createQuizDto.classIds || []; // Đảm bảo classIds luôn là một mảng
      const classes = classIds.length > 0
        ? await this.classReponsitory.find({ where: { class_id: In(classIds) } })
        : [];
  
      if (classes.length !== classIds.length) {
        throw new BadRequestException({
          message: `Một hoặc nhiều Class với ID đã nhập không tồn tại.`,
          code: 'CLASS_NOT_FOUND',
        });
      }
  
      // Tạo quiz mới
      const quiz = this.quizzesRepository.create({
        ...createQuizDto,
        user,
        subject, // Thay vì `sub`
        classes,
      });
  
      const savedQuiz = await this.quizzesRepository.save(quiz);
  
      return {
        message: 'Quiz đã được tạo thành công.',
        data: savedQuiz,
      };
    } catch (error) {
      console.error(error); // In lỗi ra console để debug dễ hơn
      throw new BadRequestException({
        message: 'Có lỗi xảy ra trong quá trình tạo quiz.',
        code: 'CREATE_QUIZ_FAILED',
      });
    }
  }

  async getTotalQuizz(): Promise<{ totalQuizz: number }> {
    const totalQuizz = await this.quizzesRepository.count();
    return { totalQuizz };
}
  

  async findAll(): Promise<any> {
    const quizzes = await this.quizzesRepository.find({
      select: ['quizz_id', 'title', 'description', 'created_at', 'time'],
      relations: ['user', 'classes', 'subject'],
    });
    
    if (!quizzes.length) {
      throw new NotFoundException({
        message: 'Không tìm thấy quiz nào.',
        code: 'NO_QUIZZES_FOUND',
      });
    }
  
    return {
      message: 'Lấy danh sách thành công',
      data: quizzes.map((quiz) => ({
        quizz_id: quiz.quizz_id,
        title: quiz.title,
        time: quiz.time,
        description: quiz.description,
        created_at: quiz.created_at,
        subject: quiz.subject,
        user: {
          username: quiz.user.username,
        },
        classes: quiz.classes.map((cls) => cls.class_name), 
      })),
    };
  }

  async getQuizzStatisticsByDate(startDate: string, endDate: string): Promise<{ date: string; count: number }[]> {
    const users = await this.quizzesRepository.createQueryBuilder("quizz")
        .select("DATE(quizz.created_at)", "date")
        .addSelect("COUNT(quizz.quizz_id)", "count")
        .where("quizz.created_at BETWEEN :startDate AND :endDate", { startDate, endDate })
        .groupBy("DATE(quizz.created_at)")
        .orderBy("date", "ASC")
        .getRawMany();

    return users.map(user => ({
        date: user.date,
        count: parseInt(user.count, 10)
    }));
}
  

  async findOne(id: string): Promise<Quizzes> {
    const quiz = await this.quizzesRepository.findOne({
      where: { quizz_id: id },
      relations: ['user', 'questions', 'questions.answers', 'classes', 'subject'], 
    });

    if (!quiz) {
      throw new NotFoundException({
        message: `Quiz với ID ${id} không tồn tại.`,
        code: 'QUIZ_NOT_FOUND',
      });
    }

    // Sắp xếp đáp án của mỗi câu hỏi theo thứ tự A, B, C, D
    quiz.questions.forEach(question => {
      if (question.answers && question.answers.length > 0) {
        question.answers.sort((a, b) => {
          const answerOrder = ['A', 'B', 'C', 'D'];
          const orderA = answerOrder.indexOf(a.answer_text.charAt(0));
          const orderB = answerOrder.indexOf(b.answer_text.charAt(0));
          return orderA - orderB;
        });
      }
    });

    return quiz;
  }


  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quizzes> {
    try {
      const quiz = await this.findOne(id);
  
      // Cập nhật userId nếu có
      if (updateQuizDto.userId) {
        const user = await this.usersRepository.findOne({ where: { user_id: updateQuizDto.userId } });
        if (user) {
          quiz.user = user;
        }
      }

      if (updateQuizDto.subjectId) {
        const subject = await this.subjectReponsitory.findOne({ where: { subject_id: updateQuizDto.subjectId } });
        if (subject) {
          quiz.subject = subject;
        }
      }
  
      // Cập nhật các lớp học nếu có
      if (updateQuizDto.classIds && updateQuizDto.classIds.length > 0) {
        const classes = await this.classReponsitory
          .createQueryBuilder('classes')
          .where('classes.class_id IN (:...classIds)', { classIds: updateQuizDto.classIds })
          .getMany();
        if (classes.length > 0) {
          quiz.classes = classes; // Cập nhật danh sách lớp học
        }
      }
  
      // Cập nhật các thuộc tính khác nếu có
      Object.assign(quiz, updateQuizDto);
  
      // Lưu lại quiz đã cập nhật
      return this.quizzesRepository.save(quiz);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Có lỗi xảy ra trong quá trình cập nhật quiz.',
        code: 'UPDATE_QUIZ_FAILED',
      });
    }
  }
  
  


  async remove(id: string): Promise<void> {
    const quiz = await this.findOne(id);
    if (!quiz) {
      throw new NotFoundException({
        message: `Quiz với ID ${id} không tồn tại.`,
        code: 'QUIZ_NOT_FOUND'
      });
    }
    await this.quizzesRepository.delete(id);
  }
}

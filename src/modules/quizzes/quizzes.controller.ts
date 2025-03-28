import { Controller, Post, Get, Put, Delete, Param, Body, Query, BadRequestException } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quizzes } from './entities/quizzes.entity';
import { UpdateQuizDto } from './dto/update-quizz.dto';
import { CreateQuizDto } from './dto/create-quizz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) { }

  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    const result = await this.quizzesService.create(createQuizDto);
    return result;
  }


  @Get()
  async findAll(): Promise<{ message: string; data: Quizzes[] }> {
    const quizzes = await this.quizzesService.findAll();
    return quizzes
  }

  @Get('count/total')
  async getTotalQuizzCount() {  // Đổi tên tránh trùng
    return this.quizzesService.getTotalQuizz();
  }

  @Get('statistics/all')
  async getUserStatisticsByDate(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException("Missing startDate or endDate");
    }
    return this.quizzesService.getQuizzStatisticsByDate(startDate, endDate);
  }


  @Get(':id')
  findOne(@Param('id') id: string): Promise<Quizzes> {
    return this.quizzesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto): Promise<Quizzes> {
    return this.quizzesService.update(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.quizzesService.remove(id);
  }
}

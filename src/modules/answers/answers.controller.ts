import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answers } from './entities/answers.entities';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) {}

    @Post()
    async create(@Body() createAnswerDto: CreateAnswerDto | CreateAnswerDto[]) {
        // Nếu client gửi một đối tượng, chuyển thành mảng
        const dtoArray = Array.isArray(createAnswerDto)
            ? createAnswerDto
            : [createAnswerDto];

        const result = await this.answersService.create(dtoArray);
        return {
            status: 201,
            message: result.message,
            data: result.data,
        };
    }

    @Get()
    async findAll() {
        const result = await this.answersService.findAll();
        return {
            status: 200,
            message: result.message,
            data: result.data,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.answersService.findOne(id);
        return {
            status: 200,
            message: result.message,
            data: result.data,
        };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
        const result = await this.answersService.update(id, updateAnswerDto);
        return {
            status: 200,
            message: result.message,
            data: result.data,
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const result = await this.answersService.remove(id);
        return {
            status: 200,
            message: result.message,
        };
    }
}

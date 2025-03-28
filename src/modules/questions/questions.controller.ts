import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Post()
    async create(@Body() createQuestionDto: CreateQuestionDto) {
        const result = await this.questionsService.create(createQuestionDto);
        return {
            status: 201,
            message: result.message,
            data: result.data
        };
    }

    @Get()
    async findAll() {
        const result = await this.questionsService.findAll();
        return {
            status: 200,
            message: result.message,
            data: result.data
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.questionsService.findOne(id);
        return {
            status: 200,
            message: result.message,
            data: result.data
        };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
        const result = await this.questionsService.update(id, updateQuestionDto);
        return {
            status: 200,
            message: result.message,
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const result = await this.questionsService.remove(id);
        return {
            status: 200,
            message: result.message
        };
    }
}

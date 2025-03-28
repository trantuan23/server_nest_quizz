import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DragDropAnswersService } from './dragdropanswers.service';
import { CreateDragDropAnswerDto } from './entities/dto/create.dto';
import { UpdateDragDropAnswerDto } from './entities/dto/update.dto';

@Controller('dragdropanswers')
export class DragDropAnswersController {
    constructor(private readonly dragService: DragDropAnswersService) {}

    @Post()
    async create(@Body() createDrag: CreateDragDropAnswerDto) {
        const result = await this.dragService.create(createDrag);
        return {
            status: 201,
            message: result.message,
            data: result.data,
        };
    }

    @Get()
    async findAll() {
        const result = await this.dragService.findAll();
        return {
            status: 200,
            message: result.message,
            data: result.data,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.dragService.findOne(id);
        return {
            status: 200,
            message: result.message,
            data: result.data,
        };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDrag: UpdateDragDropAnswerDto) {
        const result = await this.dragService.update(id, updateDrag);
        return {
            status: 200,
            message: result.message,
            data: result.data,
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const result = await this.dragService.remove(id);
        return {
            status: 200,
            message: result.message,
        };
    }
}

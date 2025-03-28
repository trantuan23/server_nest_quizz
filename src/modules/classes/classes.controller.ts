import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Classes } from './entities/classes.entity';

@Controller('classes')
export class ClassesController {
    constructor(
        private readonly classService: ClassesService
    ) { }

    @Post()
    async create(@Body() createClassDto: CreateClassDto): Promise<{ message: string, data: any }> {
        return await this.classService.create(createClassDto);
    }

    @Get()
    async findAll(
        @Query('page') page: number = 1,  // Giá trị mặc định là 1
        @Query('limit') limit: number = 10 // Giá trị mặc định là 10
    ): Promise<{ message: string, data: any }> {
        return await this.classService.findAll(page, limit);
    }

    @Get('all')
    async getAll():Promise<Classes[]>{
        return await this.classService.getClass()
    }


    @Get(':id')
    async findOne(@Param('id') id: string): Promise<{ message: string, data: any }> {
        return await this.classService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') class_id: string,
        @Body() updateClassDto: UpdateClassDto
    ): Promise<{ message: string, data: any }> {
        return await this.classService.update(class_id, updateClassDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        return await this.classService.remove(id);
    }
}

import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subjects } from './entities/subject.entity';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subjects')
export class SubjectsController {
    constructor(
        private readonly subjectService: SubjectsService
    ) { }

    @Post()
    create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subjects> {
        return this.subjectService.create(createSubjectDto)
    }

    @Get()
    findAll(): Promise<Subjects[]> {
        return this.subjectService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') subject_id: string): Promise<Subjects> {
        return this.subjectService.findOne(subject_id)
    }

    @Put(':id')
    update(@Param('id') subject_id: string, @Body() updateSubjectDto: UpdateSubjectDto): Promise<Subjects> {
        return this.subjectService.update(subject_id, updateSubjectDto)
    }

    @Delete(':id')
    delete(@Param('id') subject_id: string): Promise<void> {
        return this.subjectService.remove(subject_id)
    }

}

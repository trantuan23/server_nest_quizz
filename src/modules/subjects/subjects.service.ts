import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subjects } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subjects)
        private subjectRepository: Repository<Subjects>
    ) { }

    async create(createSubjectDto: CreateSubjectDto): Promise<Subjects> {
        const existsSub = await this.subjectRepository.findOne({ where: { subject_name: createSubjectDto.subject_name } });
        if (existsSub) {
            throw new BadRequestException("Môn học đã tồn tại!");
        }
        const sub = this.subjectRepository.create(createSubjectDto);
        return this.subjectRepository.save(sub);
    }

    async findAll(): Promise<Subjects[]> {
        return this.subjectRepository.find();
    }

    async findOne(id: string): Promise<Subjects> {
        const subject = await this.subjectRepository.findOne({ where: { subject_id: id } });
        if (!subject) {
            throw new NotFoundException(`Không tìm thấy môn học có ID: ${id}`);
        }
        return subject;
    }

    async update(subject_id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subjects> {
        await this.subjectRepository.update(subject_id, updateSubjectDto);
        return this.findOne(subject_id);
    }

    async remove(subject_id: string): Promise<void> {
        const subject = await this.subjectRepository.findOne({ where: { subject_id } });
        if (!subject) {
            throw new NotFoundException(`Môn học với ID: ${subject_id} không tồn tại!`);
        }
        await this.subjectRepository.delete(subject_id);
    }
}

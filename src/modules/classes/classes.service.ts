import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from './entities/classes.entity';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(Classes)
        private classRepository: Repository<Classes>,
    ) { }

    async create(createClassDto: CreateClassDto): Promise<{ message: string, data: Classes }> {
        const existingClass = await this.classRepository.findOne({
            where: { class_name: createClassDto.class_name }
        });
        if (existingClass) {
            throw new BadRequestException(`Lớp đã tồn tại!`);
        }

        try {
            const newClass = this.classRepository.create(createClassDto);
            const savedClass = await this.classRepository.save(newClass);

            return {
                message: 'Tạo lớp học thành công!',
                data: savedClass
            };
        } catch (error) {
            throw new InternalServerErrorException('Không thể tạo lớp học. ' + error.message);
        }
    }

    async findAll(page: number, limit: number): Promise<{ message: string, data: Classes[], total: number, currentPage: number }> {
        if (page <= 0) {
            throw new BadRequestException('Trang phải lớn hơn 0');
        }
        if (limit <= 0) {
            throw new BadRequestException('Giới hạn phải lớn hơn 0');
        }

        const skip = (page - 1) * limit;
        const [classes, total] = await this.classRepository.findAndCount({
            skip: skip,
            take: limit,
        });

        if (classes.length === 0) {
            throw new NotFoundException('Không có dữ liệu');
        }

        return {
            message: 'Lấy danh sách lớp học thành công!',
            data: classes,
            total: total,
            currentPage: page,
        };
    }

    async getClass():Promise<Classes[]>{
        return this.classRepository.find()
    }



    async findOne(id: string): Promise<{ message: string, data: Classes }> {
        const classData = await this.classRepository.findOne({ where: { class_id: id } });
        if (!classData) {
            throw new NotFoundException(`Không tìm thấy dữ liệu lớp có ID: ${id}`);
        }

        return {
            message: 'Lấy thông tin lớp học thành công!',
            data: classData
        };
    }

    async update(class_id: string, updateClassDto: UpdateClassDto): Promise<{ message: string, data: Classes }> {
        const classData = await this.findOne(class_id);
        if (!classData) {
            throw new NotFoundException(`Không tìm thấy dữ liệu lớp có ID: ${class_id}`);
        }

        try {
            await this.classRepository.update(class_id, updateClassDto);
            const updatedClass = await this.findOne(class_id);
            return {
                message: 'Cập nhật lớp học thành công!',
                data: updatedClass.data
            };
        } catch (error) {
            throw new InternalServerErrorException('Cập nhật lớp không thành công. ' + error.message);
        }
    }

    async remove(id: string): Promise<{ message: string }> {
        const classData = await this.findOne(id);
        if (!classData) {
            throw new NotFoundException(`Không tìm thấy dữ liệu lớp có ID: ${id}`);
        }

        try {
            await this.classRepository.delete(id);
            return { message: 'Xoá lớp học thành công!' };
        } catch (error) {
            throw new InternalServerErrorException('Không thể xoá lớp này. ' + error.message);
        }
    }
}

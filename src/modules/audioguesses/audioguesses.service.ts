import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioGuesses } from './entities/audioguesses.entity';
import { Repository } from 'typeorm';
import { Questions } from '../questions/entities/question.entities';
import { CreateAudioGuessDto } from './dto/create-audioguessses.dto';
import { UpdateAudioGuessDto } from './dto/update-audioguessses.dto';

@Injectable()
export class AudioguessesService {
    constructor(
        @InjectRepository(AudioGuesses)
        private audioguesRepository: Repository<AudioGuesses>,
        @InjectRepository(Questions)
        private questionRespository: Repository<Questions>
    ) {}

    async create(createAudioGuessDto: CreateAudioGuessDto): Promise<{ message: string; data: AudioGuesses }> {
        const question = await this.questionRespository.findOne({ where: { question_id: createAudioGuessDto.questionId } });
        if (!question) {
            throw new BadRequestException('Question not found!');
        }
        const audio = this.audioguesRepository.create({ ...createAudioGuessDto, question });
        const savedAudio = await this.audioguesRepository.save(audio);
        return {
            message: 'Tạo câu trả lời âm thanh thành công!',
            data: savedAudio,
        };
    }

    async findAll(): Promise<{ message: string; data: AudioGuesses[] }> {
        const audioGuesses = await this.audioguesRepository.find({ relations: ['question'] });
        return {
            message: 'Lấy danh sách câu trả lời âm thanh thành công!',
            data: audioGuesses,
        };
    }

    async findOne(id: string): Promise<{ message: string; data: AudioGuesses }> {
        const audioGuess = await this.audioguesRepository.findOne({ where: { audio_guess_id: id }, relations: ['question'] });
        if (!audioGuess) {
            throw new BadRequestException('AudioGuess not found!');
        }
        return {
            message: 'Lấy thông tin câu trả lời âm thanh thành công!',
            data: audioGuess,
        };
    }

    async update(id: string, updateAudioGuessDto: UpdateAudioGuessDto): Promise<{ message: string; data: AudioGuesses }> {
        await this.audioguesRepository.update(id, updateAudioGuessDto);
        const updatedAudio = await this.findOne(id);
        return {
            message: 'Cập nhật câu trả lời âm thanh thành công!',
            data: updatedAudio.data,
        };
    }

    async remove(id: string): Promise<{ message: string }> {
        await this.findOne(id);  // Kiểm tra nếu AudioGuess tồn tại
        await this.audioguesRepository.delete(id);
        return {
            message: 'Xoá câu trả lời âm thanh thành công!',
        };
    }
}

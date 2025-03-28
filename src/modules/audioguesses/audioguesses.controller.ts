import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AudioguessesService } from './audioguesses.service';
import { CreateAudioGuessDto } from './dto/create-audioguessses.dto';
import { AudioGuesses } from './entities/audioguesses.entity';
import { UpdateAudioGuessDto } from './dto/update-audioguessses.dto';

@Controller('audioguesses')
export class AudioguessesController {
    constructor(private readonly audioGuessService: AudioguessesService) {}

    @Post()
    async create(@Body() createAudioGuessDto: CreateAudioGuessDto) {
        const result = await this.audioGuessService.create(createAudioGuessDto);
        return {
            status: 201,
            message: result.message,
            data: result.data,
        };
    }

    @Get()
    async findAll() {
        const result = await this.audioGuessService.findAll();
        return {
            status: 200,
            message: result.message,
            data: result.data,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.audioGuessService.findOne(id);
        return {
            status: 200,
            message: result.message,
            data: result.data,
        };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAudioGuessDto: UpdateAudioGuessDto) {
        const result = await this.audioGuessService.update(id, updateAudioGuessDto);
        return {
            status: 200,
            message: result.message,
            data: result.data,
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const result = await this.audioGuessService.remove(id);
        return {
            status: 200,
            message: result.message,
        };
    }
}

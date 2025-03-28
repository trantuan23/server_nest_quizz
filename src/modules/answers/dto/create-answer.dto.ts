import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreateAnswerDto {
    @IsUUID()
    questionId: string;

    @IsString()
    @IsOptional()
    answer_text: string;

    @IsBoolean()
    @IsOptional()
    is_correct: boolean;

    @IsString()
    @IsOptional()
    reason: string | null;  // Đảm bảo lý do có thể là null
}

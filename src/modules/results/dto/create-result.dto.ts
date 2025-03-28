import { IsUUID, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class SelectedAnswerDto {
    @IsUUID()
    @IsOptional()
    answer_id?: string;

    @IsNotEmpty()
    @IsOptional()
    answer_text?: string;

    @IsNotEmpty()
    @IsOptional()
    is_correct?: boolean;
}

class AnswerDto {
    @IsUUID()
    question_id: string;

    @IsNotEmpty()
    question_text: string;

    @IsOptional() // Không yêu cầu score khi không có đáp án
    score?: number; // Có thể để score là tùy chọn (optional)

    @ValidateNested()
    @Type(() => SelectedAnswerDto)
    selected_answer: SelectedAnswerDto | "";
}


export class CreateResultDto {
    @IsUUID()
    quizId: string;

    @IsUUID()
    userId: string;

    @IsUUID()
    subjectId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AnswerDto)
    answers: AnswerDto[];
}

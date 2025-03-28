import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { QuestionType } from '../entities/question.entities';

export class CreateQuestionDto {
  @IsNotEmpty({ message: 'Nội dung câu hỏi không được để trống.' })
  @IsString({ message: 'Nội dung câu hỏi phải là một chuỗi văn bản.' })
  question_text: string;

  @IsNotEmpty({ message: 'Loại câu hỏi không được để trống.' })
  @IsEnum(QuestionType, { message: 'Loại câu hỏi không hợp lệ.' })
  question_type: QuestionType;


  @IsOptional()
  @IsUrl({}, { message: 'Địa chỉ URL không hợp lệ.' })
  media_url?: string;

  @IsNotEmpty({ message: 'ID quiz không được để trống.' })
  @IsString({ message: 'ID quiz phải là một chuỗi văn bản.' })
  quizzId: string;
}

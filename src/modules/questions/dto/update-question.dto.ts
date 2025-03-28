import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
  } from "class-validator";
  import { QuestionType } from "../entities/question.entities";
  
  export class UpdateQuestionDto {
    @IsNotEmpty()
    @IsString()
    question_text: string;

    @IsNotEmpty()
    @IsEnum(QuestionType, { message: "Loại câu hỏi không hợp lệ." })
    question_type: QuestionType;

    @IsOptional()
    @IsUrl({}, { message: "URL media không hợp lệ." }) 
    media_url?: string | null; 
} 



  
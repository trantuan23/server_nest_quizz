import { IsArray, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsString()
  article?: string;

  @IsNumber()
  time: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsArray()
  @IsString({ each: true })
  classIds: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  subjectId: string;
}

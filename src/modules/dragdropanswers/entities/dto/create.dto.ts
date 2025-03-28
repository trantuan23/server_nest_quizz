import { IsNotEmpty, IsUUID, IsJSON } from 'class-validator';

export class CreateDragDropAnswerDto {
  @IsNotEmpty()
  @IsJSON()
  correct_order: any;

  @IsNotEmpty()
  @IsUUID()
  questionId: string;
}

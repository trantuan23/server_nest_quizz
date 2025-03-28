import { IsOptional, IsJSON, IsUUID } from 'class-validator';

export class UpdateDragDropAnswerDto {
  @IsOptional()
  @IsJSON()
  correct_order?: any;
}

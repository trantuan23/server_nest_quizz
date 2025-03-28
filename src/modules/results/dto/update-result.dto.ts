import { IsOptional, IsNumber } from 'class-validator';

export class UpdateResultDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  score?: number;
}

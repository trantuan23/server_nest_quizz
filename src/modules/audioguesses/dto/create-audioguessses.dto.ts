import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAudioGuessDto {
  @IsNotEmpty()
  @IsString()
  correct_guess: string;

  @IsNotEmpty()
  @IsUUID()
  questionId: string; 
}

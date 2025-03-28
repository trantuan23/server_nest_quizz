import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateAudioGuessDto {
  @IsNotEmpty()
  @IsString()
  correct_guess: string;
}

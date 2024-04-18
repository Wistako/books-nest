import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from 'src/utils/match.decorator';

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(5, 40)
  @IsString()
  password: string;

  @IsNotEmpty()
  @Length(5, 40)
  @IsString()
  @Match('password')
  passwordRepeat: string;
}

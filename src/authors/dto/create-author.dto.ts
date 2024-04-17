import { IsNotEmpty, Length } from 'class-validator';

export class CreateAuthorDTO {
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @Length(1, 3)
  country: string;
}

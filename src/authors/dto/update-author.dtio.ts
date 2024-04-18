import { IsNotEmpty, Length } from 'class-validator';

export class UpdateAuthorDTO {
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @Length(1, 3)
  country: string;
}

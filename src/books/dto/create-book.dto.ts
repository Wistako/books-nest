import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsUUID, Length, Max, Min } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @IsNotEmpty()
  @Length(3, 100)
  title: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => parseInt(value))
  rating: number;

  @IsNotEmpty()
  @Min(0)
  @Max(1000)
  @Transform(({ value }) => parseFloat(value))
  price: number;
}

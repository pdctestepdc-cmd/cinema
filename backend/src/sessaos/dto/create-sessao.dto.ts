import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSessaoDto {
  @Type(() => Date)
  @IsDate()
  horario!: Date;

  @IsString()
  @MaxLength(20)
  sala!: string;

  @IsNumber()
  preco!: number;

  @IsNumber()
  filmeId!: number;
}

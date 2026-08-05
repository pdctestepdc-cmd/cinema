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

export class CreateFuncionarioDto {
  @IsString()
  @MaxLength(100)
  nome!: string;

  @IsString()
  @MaxLength(50)
  cargo!: string;

  @IsString()
  @IsEmail()
  @MaxLength(100)
  email!: string;
}

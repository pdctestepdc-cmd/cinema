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

export class CreateClienteDto {
  @IsString()
  @MaxLength(100)
  nome!: string;

  @IsString()
  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsString()
  @MaxLength(15)
  telefone!: string;
}

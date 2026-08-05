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

export class CreateFilmeDto {
  @IsString()
  @MaxLength(100)
  titulo!: string;

  @IsNumber()
  duracao!: number;

  @IsString()
  @MaxLength(50)
  genero!: string;

  @IsString()
  @MaxLength(20)
  classificacao!: string;

  @IsString()
  sinopse!: string;
}

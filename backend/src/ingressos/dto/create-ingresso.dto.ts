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

export class CreateIngressoDto {
  @IsString()
  @MaxLength(10)
  assento!: string;

  @IsNumber()
  clienteId!: number;

  @IsNumber()
  sessaoId!: number;

  @IsOptional()
  @IsNumber()
  funcionarioId?: number;
}

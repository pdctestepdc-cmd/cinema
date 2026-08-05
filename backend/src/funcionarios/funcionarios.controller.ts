import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FuncionarioService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { FuncionarioResponseDto } from './dto/funcionario-response.dto';

@ApiTags('Funcionario')
@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @ApiOperation({ summary: 'List all Funcionario records' })
  @Get()
  findAll(): Promise<FuncionarioResponseDto[]> {
    return this.funcionarioService.findAll();
  }

  @ApiOperation({ summary: 'Get a Funcionario by id' })
  @Get(':id')
  findById(@Param('id') id: number): Promise<FuncionarioResponseDto> {
    return this.funcionarioService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new Funcionario' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateFuncionarioDto): Promise<FuncionarioResponseDto> {
    return this.funcionarioService.create(dto);
  }

  @ApiOperation({ summary: 'Update an existing Funcionario' })
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateFuncionarioDto,
  ): Promise<FuncionarioResponseDto> {
    return this.funcionarioService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a Funcionario by id' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number): Promise<void> {
    return this.funcionarioService.delete(id);
  }
}

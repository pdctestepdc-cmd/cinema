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
import { FilmeService } from './filmes.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { FilmeResponseDto } from './dto/filme-response.dto';

@ApiTags('Filme')
@Controller('filmes')
export class FilmeController {
  constructor(private readonly filmeService: FilmeService) {}

  @ApiOperation({ summary: 'List all Filme records' })
  @Get()
  findAll(): Promise<FilmeResponseDto[]> {
    return this.filmeService.findAll();
  }

  @ApiOperation({ summary: 'Get a Filme by id' })
  @Get(':id')
  findById(@Param('id') id: number): Promise<FilmeResponseDto> {
    return this.filmeService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new Filme' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateFilmeDto): Promise<FilmeResponseDto> {
    return this.filmeService.create(dto);
  }

  @ApiOperation({ summary: 'Update an existing Filme' })
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateFilmeDto,
  ): Promise<FilmeResponseDto> {
    return this.filmeService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a Filme by id' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number): Promise<void> {
    return this.filmeService.delete(id);
  }
}

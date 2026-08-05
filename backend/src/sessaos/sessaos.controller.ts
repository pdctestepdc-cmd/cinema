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
import { SessaoService } from './sessaos.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';
import { SessaoResponseDto } from './dto/sessao-response.dto';

@ApiTags('Sessao')
@Controller('sessaos')
export class SessaoController {
  constructor(private readonly sessaoService: SessaoService) {}

  @ApiOperation({ summary: 'List all Sessao records' })
  @Get()
  findAll(): Promise<SessaoResponseDto[]> {
    return this.sessaoService.findAll();
  }

  @ApiOperation({ summary: 'Get a Sessao by id' })
  @Get(':id')
  findById(@Param('id') id: number): Promise<SessaoResponseDto> {
    return this.sessaoService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new Sessao' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateSessaoDto): Promise<SessaoResponseDto> {
    return this.sessaoService.create(dto);
  }

  @ApiOperation({ summary: 'Update an existing Sessao' })
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateSessaoDto,
  ): Promise<SessaoResponseDto> {
    return this.sessaoService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a Sessao by id' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number): Promise<void> {
    return this.sessaoService.delete(id);
  }
}

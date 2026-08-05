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
import { IngressoService } from './ingressos.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';
import { IngressoResponseDto } from './dto/ingresso-response.dto';

@ApiTags('Ingresso')
@Controller('ingressos')
export class IngressoController {
  constructor(private readonly ingressoService: IngressoService) {}

  @ApiOperation({ summary: 'List all Ingresso records' })
  @Get()
  findAll(): Promise<IngressoResponseDto[]> {
    return this.ingressoService.findAll();
  }

  @ApiOperation({ summary: 'Get a Ingresso by id' })
  @Get(':id')
  findById(@Param('id') id: number): Promise<IngressoResponseDto> {
    return this.ingressoService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new Ingresso' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateIngressoDto): Promise<IngressoResponseDto> {
    return this.ingressoService.create(dto);
  }

  @ApiOperation({ summary: 'Update an existing Ingresso' })
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateIngressoDto,
  ): Promise<IngressoResponseDto> {
    return this.ingressoService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a Ingresso by id' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number): Promise<void> {
    return this.ingressoService.delete(id);
  }
}

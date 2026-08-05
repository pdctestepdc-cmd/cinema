import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sessao } from './sessao.entity';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';
import { SessaoResponseDto } from './dto/sessao-response.dto';

@Injectable()
export class SessaoService {
  constructor(
    @InjectRepository(Sessao)
    private readonly sessaoRepository: Repository<Sessao>,
  ) {}

  async findAll(): Promise<SessaoResponseDto[]> {
    const entities = await this.sessaoRepository.find();
    return entities.map((entity) => this.toResponse(entity));
  }

  async findById(id: number): Promise<SessaoResponseDto> {
    const entity = await this.sessaoRepository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Sessao not found: ${id}`);
    }
    return this.toResponse(entity);
  }

  async create(dto: CreateSessaoDto): Promise<SessaoResponseDto> {
    const entity = this.sessaoRepository.create({
      horario: dto.horario,
      sala: dto.sala,
      preco: dto.preco,
      filme: dto.filmeId != null ? { id: dto.filmeId } : undefined,
    });
    const saved = await this.sessaoRepository.save(entity);
    return this.toResponse(saved);
  }

  async update(id: number, dto: UpdateSessaoDto): Promise<SessaoResponseDto> {
    const entity = await this.sessaoRepository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Sessao not found: ${id}`);
    }
    if (dto.horario !== undefined) entity.horario = dto.horario;
    if (dto.sala !== undefined) entity.sala = dto.sala;
    if (dto.preco !== undefined) entity.preco = dto.preco;
    if (dto.filmeId !== undefined) entity.filme = { id: dto.filmeId } as any;
    const saved = await this.sessaoRepository.save(entity);
    return this.toResponse(saved);
  }

  async delete(id: number): Promise<void> {
    const result = await this.sessaoRepository.delete(id as any);
    if (result.affected === 0) {
      throw new NotFoundException(`Sessao not found: ${id}`);
    }
  }

  private toResponse(entity: Sessao): SessaoResponseDto {
    return {
      id: entity.id,
      horario: entity.horario,
      sala: entity.sala,
      preco: entity.preco,
      filmeId: entity.filme?.id ?? undefined,
    };
  }
}

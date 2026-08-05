import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filme } from './filme.entity';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { FilmeResponseDto } from './dto/filme-response.dto';

@Injectable()
export class FilmeService {
  constructor(
    @InjectRepository(Filme)
    private readonly filmeRepository: Repository<Filme>,
  ) {}

  async findAll(): Promise<FilmeResponseDto[]> {
    const entities = await this.filmeRepository.find();
    return entities.map((entity) => this.toResponse(entity));
  }

  async findById(id: number): Promise<FilmeResponseDto> {
    const entity = await this.filmeRepository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Filme not found: ${id}`);
    }
    return this.toResponse(entity);
  }

  async create(dto: CreateFilmeDto): Promise<FilmeResponseDto> {
    const entity = this.filmeRepository.create({
      titulo: dto.titulo,
      duracao: dto.duracao,
      genero: dto.genero,
      classificacao: dto.classificacao,
      sinopse: dto.sinopse,
    });
    const saved = await this.filmeRepository.save(entity);
    return this.toResponse(saved);
  }

  async update(id: number, dto: UpdateFilmeDto): Promise<FilmeResponseDto> {
    const entity = await this.filmeRepository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Filme not found: ${id}`);
    }
    if (dto.titulo !== undefined) entity.titulo = dto.titulo;
    if (dto.duracao !== undefined) entity.duracao = dto.duracao;
    if (dto.genero !== undefined) entity.genero = dto.genero;
    if (dto.classificacao !== undefined) entity.classificacao = dto.classificacao;
    if (dto.sinopse !== undefined) entity.sinopse = dto.sinopse;
    const saved = await this.filmeRepository.save(entity);
    return this.toResponse(saved);
  }

  async delete(id: number): Promise<void> {
    const result = await this.filmeRepository.delete(id as any);
    if (result.affected === 0) {
      throw new NotFoundException(`Filme not found: ${id}`);
    }
  }

  private toResponse(entity: Filme): FilmeResponseDto {
    return {
      id: entity.id,
      titulo: entity.titulo,
      duracao: entity.duracao,
      genero: entity.genero,
      classificacao: entity.classificacao,
      sinopse: entity.sinopse,
    };
  }
}

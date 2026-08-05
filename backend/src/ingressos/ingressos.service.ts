import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingresso } from './ingresso.entity';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';
import { IngressoResponseDto } from './dto/ingresso-response.dto';

@Injectable()
export class IngressoService {
  constructor(
    @InjectRepository(Ingresso)
    private readonly ingressoRepository: Repository<Ingresso>,
  ) {}

  async findAll(): Promise<IngressoResponseDto[]> {
    const entities = await this.ingressoRepository.find();
    return entities.map((entity) => this.toResponse(entity));
  }

  async findById(id: number): Promise<IngressoResponseDto> {
    const entity = await this.ingressoRepository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Ingresso not found: ${id}`);
    }
    return this.toResponse(entity);
  }

  async create(dto: CreateIngressoDto): Promise<IngressoResponseDto> {
    const entity = this.ingressoRepository.create({
      assento: dto.assento,
      cliente: dto.clienteId != null ? { id: dto.clienteId } : undefined,
      sessao: dto.sessaoId != null ? { id: dto.sessaoId } : undefined,
      funcionario: dto.funcionarioId != null ? { id: dto.funcionarioId } : undefined,
    });
    const saved = await this.ingressoRepository.save(entity);
    return this.toResponse(saved);
  }

  async update(id: number, dto: UpdateIngressoDto): Promise<IngressoResponseDto> {
    const entity = await this.ingressoRepository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Ingresso not found: ${id}`);
    }
    if (dto.assento !== undefined) entity.assento = dto.assento;
    if (dto.clienteId !== undefined) entity.cliente = { id: dto.clienteId } as any;
    if (dto.sessaoId !== undefined) entity.sessao = { id: dto.sessaoId } as any;
    if (dto.funcionarioId !== undefined) entity.funcionario = { id: dto.funcionarioId } as any;
    const saved = await this.ingressoRepository.save(entity);
    return this.toResponse(saved);
  }

  async delete(id: number): Promise<void> {
    const result = await this.ingressoRepository.delete(id as any);
    if (result.affected === 0) {
      throw new NotFoundException(`Ingresso not found: ${id}`);
    }
  }

  private toResponse(entity: Ingresso): IngressoResponseDto {
    return {
      id: entity.id,
      assento: entity.assento,
      clienteId: entity.cliente?.id ?? undefined,
      sessaoId: entity.sessao?.id ?? undefined,
      funcionarioId: entity.funcionario?.id ?? undefined,
    };
  }
}

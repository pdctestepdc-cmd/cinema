import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from './funcionario.entity';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { FuncionarioResponseDto } from './dto/funcionario-response.dto';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
  ) {}

  async findAll(): Promise<FuncionarioResponseDto[]> {
    const entities = await this.funcionarioRepository.find();
    return entities.map((entity) => this.toResponse(entity));
  }

  async findById(id: number): Promise<FuncionarioResponseDto> {
    const entity = await this.funcionarioRepository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Funcionario not found: ${id}`);
    }
    return this.toResponse(entity);
  }

  async create(dto: CreateFuncionarioDto): Promise<FuncionarioResponseDto> {
    const entity = this.funcionarioRepository.create({
      nome: dto.nome,
      cargo: dto.cargo,
      email: dto.email,
    });
    const saved = await this.funcionarioRepository.save(entity);
    return this.toResponse(saved);
  }

  async update(id: number, dto: UpdateFuncionarioDto): Promise<FuncionarioResponseDto> {
    const entity = await this.funcionarioRepository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Funcionario not found: ${id}`);
    }
    if (dto.nome !== undefined) entity.nome = dto.nome;
    if (dto.cargo !== undefined) entity.cargo = dto.cargo;
    if (dto.email !== undefined) entity.email = dto.email;
    const saved = await this.funcionarioRepository.save(entity);
    return this.toResponse(saved);
  }

  async delete(id: number): Promise<void> {
    const result = await this.funcionarioRepository.delete(id as any);
    if (result.affected === 0) {
      throw new NotFoundException(`Funcionario not found: ${id}`);
    }
  }

  private toResponse(entity: Funcionario): FuncionarioResponseDto {
    return {
      id: entity.id,
      nome: entity.nome,
      cargo: entity.cargo,
      email: entity.email,
    };
  }
}

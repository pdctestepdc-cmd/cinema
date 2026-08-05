import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { IngressoService } from './ingressos.service';
import { Ingresso } from './ingresso.entity';

describe('IngressoService', () => {
  let service: IngressoService;
  let repo: jest.Mocked<Repository<Ingresso>>;

  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngressoService,
        { provide: getRepositoryToken(Ingresso), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<IngressoService>(IngressoService);
    repo = module.get(getRepositoryToken(Ingresso));
  });

  afterEach(() => jest.clearAllMocks());

  it('create persists and returns response', async () => {
    const dto = { assento: "sample", clienteId: 1, sessaoId: 1, funcionarioId: 1 };
    const entity = { id: 1, ...dto };
    mockRepo.create.mockReturnValue(entity);
    mockRepo.save.mockResolvedValue(entity);

    const result = await service.create(dto as any);

    expect(result.id).toBeDefined();
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('findById throws NotFoundException when missing', async () => {
    mockRepo.findOne.mockResolvedValue(null);

    await expect(service.findById(1)).rejects.toThrow(NotFoundException);
  });

  it('delete throws NotFoundException when missing', async () => {
    mockRepo.delete.mockResolvedValue({ affected: 0 });

    await expect(service.delete(1)).rejects.toThrow(NotFoundException);
  });
});

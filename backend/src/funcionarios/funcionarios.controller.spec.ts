import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { FuncionarioController } from './funcionarios.controller';
import { FuncionarioService } from './funcionarios.service';

describe('FuncionarioController', () => {
  let app: INestApplication;
  const mockFuncionarioService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncionarioController],
      providers: [{ provide: FuncionarioService, useValue: mockFuncionarioService }],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterEach(() => jest.clearAllMocks());
  afterAll(() => app.close());

  it('POST /funcionarios returns 201', async () => {
    mockFuncionarioService.create.mockResolvedValue({ id: 1, nome: "sample", cargo: "sample", email: "user@example.com" });

    await request.default(app.getHttpServer())
      .post('/funcionarios')
      .send({ nome: "sample", cargo: "sample", email: "user@example.com" })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
      });
  });

  it('GET /funcionarios/:id returns 404 when missing', async () => {
    mockFuncionarioService.findById.mockRejectedValue(
      Object.assign(new NotFoundException('not found'), { status: 404 }),
    );

    await request.default(app.getHttpServer())
      .get('/funcionarios/1')
      .expect(404);
  });
});

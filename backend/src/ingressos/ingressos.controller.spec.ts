import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { IngressoController } from './ingressos.controller';
import { IngressoService } from './ingressos.service';

describe('IngressoController', () => {
  let app: INestApplication;
  const mockIngressoService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngressoController],
      providers: [{ provide: IngressoService, useValue: mockIngressoService }],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterEach(() => jest.clearAllMocks());
  afterAll(() => app.close());

  it('POST /ingressos returns 201', async () => {
    mockIngressoService.create.mockResolvedValue({ id: 1, assento: "sample", clienteId: 1, sessaoId: 1, funcionarioId: 1 });

    await request.default(app.getHttpServer())
      .post('/ingressos')
      .send({ assento: "sample", clienteId: 1, sessaoId: 1, funcionarioId: 1 })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
      });
  });

  it('GET /ingressos/:id returns 404 when missing', async () => {
    mockIngressoService.findById.mockRejectedValue(
      Object.assign(new NotFoundException('not found'), { status: 404 }),
    );

    await request.default(app.getHttpServer())
      .get('/ingressos/1')
      .expect(404);
  });
});

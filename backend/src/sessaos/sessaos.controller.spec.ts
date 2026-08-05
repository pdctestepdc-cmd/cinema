import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { SessaoController } from './sessaos.controller';
import { SessaoService } from './sessaos.service';

describe('SessaoController', () => {
  let app: INestApplication;
  const mockSessaoService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessaoController],
      providers: [{ provide: SessaoService, useValue: mockSessaoService }],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterEach(() => jest.clearAllMocks());
  afterAll(() => app.close());

  it('POST /sessaos returns 201', async () => {
    mockSessaoService.create.mockResolvedValue({ id: 1, horario: new Date(), sala: "sample", preco: 1, filmeId: 1 });

    await request.default(app.getHttpServer())
      .post('/sessaos')
      .send({ horario: new Date(), sala: "sample", preco: 1, filmeId: 1 })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
      });
  });

  it('GET /sessaos/:id returns 404 when missing', async () => {
    mockSessaoService.findById.mockRejectedValue(
      Object.assign(new NotFoundException('not found'), { status: 404 }),
    );

    await request.default(app.getHttpServer())
      .get('/sessaos/1')
      .expect(404);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { FilmeController } from './filmes.controller';
import { FilmeService } from './filmes.service';

describe('FilmeController', () => {
  let app: INestApplication;
  const mockFilmeService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmeController],
      providers: [{ provide: FilmeService, useValue: mockFilmeService }],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterEach(() => jest.clearAllMocks());
  afterAll(() => app.close());

  it('POST /filmes returns 201', async () => {
    mockFilmeService.create.mockResolvedValue({ id: 1, titulo: "sample", duracao: 1, genero: "sample", classificacao: "sample", sinopse: "sample" });

    await request.default(app.getHttpServer())
      .post('/filmes')
      .send({ titulo: "sample", duracao: 1, genero: "sample", classificacao: "sample", sinopse: "sample" })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
      });
  });

  it('GET /filmes/:id returns 404 when missing', async () => {
    mockFilmeService.findById.mockRejectedValue(
      Object.assign(new NotFoundException('not found'), { status: 404 }),
    );

    await request.default(app.getHttpServer())
      .get('/filmes/1')
      .expect(404);
  });
});

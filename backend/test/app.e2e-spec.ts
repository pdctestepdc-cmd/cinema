import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(() => app.close());

  it('context loads', () => {
    expect(app).toBeDefined();
  });

  it('Swagger API docs are served', async () => {
    await request(app.getHttpServer())
      .get('/api-docs-json')
      .expect(200)
      .expect((res) => {
        expect(res.body.openapi).toBeDefined();
      });
  });

  it('every collection route responds', async () => {
    await request(app.getHttpServer()).get('/filmes').expect(200);
    await request(app.getHttpServer()).get('/clientes').expect(200);
    await request(app.getHttpServer()).get('/funcionarios').expect(200);
    await request(app.getHttpServer()).get('/sessaos').expect(200);
    await request(app.getHttpServer()).get('/ingressos').expect(200);
  });
});

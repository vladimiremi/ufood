import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('Establishments', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/establishments (GET) get all establishments', async () => {
    const establishments = await request(app.getHttpServer())
      .get('/establishments')
      .expect(200);

    expect(establishments.body[0]).toHaveProperty('id');
    expect(establishments.body[0]).toHaveProperty('username');
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });
});

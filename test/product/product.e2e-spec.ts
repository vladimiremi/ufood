import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
      }),
    );
    await app.init();
  });

  let productId: string;
  it('/products (GET)', async () => {
    const product = await request(app.getHttpServer())
      .get('/products')
      .expect(200);
    expect(product.body[0]).toHaveProperty('id');
    expect(product.body[0]).toHaveProperty('name');
    expect(product.body[0]).toHaveProperty('description');
    productId = product.body[0].id;
  });

  it('/products/:productId/items (GET)', async () => {
    const product = await request(app.getHttpServer())
      .get(`/products/${productId}/items`)
      .expect(200);

    expect(product.body[0]).toHaveProperty('id');
    expect(product.body[0]).toHaveProperty('productId');
    expect(product.body[0]).toHaveProperty('name');
    expect(typeof product.body[0].price).toEqual('number');
    expect(product.body[0]).toHaveProperty('description');
  });

  it('/products/:productId/items (POST) - User can create a new item', async () => {
    const data = {
      name: 'Item 1',
      price: 4,
      description: 'Item 1 description',
    };
    const product = await request(app.getHttpServer())
      .post(`/products/${productId}/items`)
      .send(data);
    // .expect(201);
    console.log(product.body);
    expect(product.body).toHaveProperty('id');
    expect(product.body).toHaveProperty('productId');
    expect(product.body).toHaveProperty('name');
    expect(typeof product.body.price).toEqual('number');
    expect(product.body).toHaveProperty('description');
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });
});

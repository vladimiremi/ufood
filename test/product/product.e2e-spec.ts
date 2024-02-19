import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

const userDefault = {
  userName: 'vladimir',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  let productId: string;
  it('/products (GET) user can list your products', async () => {
    const product = await request(app.getHttpServer())
      .get('/products')
      .query({ userName: userDefault.userName })
      .expect(200);
    expect(product.body[0]).toHaveProperty('id');
    expect(product.body[0]).toHaveProperty('name');
    expect(product.body[0]).toHaveProperty('description');
    productId = product.body[0].id;
  });

  let itemId: string;
  it('/products/:productId/items (POST) - User can create a new item', async () => {
    const data = {
      name: 'Item 1',
      price: 4,
      description: 'Item 1 description',
    };
    const product = await request(app.getHttpServer())
      .post(`/products/${productId}/items`)
      .send(data)
      .expect(201);

    expect(product.body).toHaveProperty('id');
    expect(product.body).toHaveProperty('productId');
    expect(product.body).toHaveProperty('name');
    expect(typeof product.body.price).toEqual('number');
    expect(product.body).toHaveProperty('description');
    itemId = product.body.id;
  });

  it('/products/:productId/items (GET)', async () => {
    const items = await request(app.getHttpServer())
      .get(`/products/${productId}/items`)
      .expect(200);

    expect(items.body[0]).toHaveProperty('id');
    expect(items.body[0]).toHaveProperty('productId');
    expect(items.body[0]).toHaveProperty('name');
    expect(typeof items.body[0].price).toEqual('number');
    expect(items.body[0]).toHaveProperty('description');
  });

  it('/products/:productId/items (PUT) - User can edit a item', async () => {
    const data = {
      name: 'Item edited',
      price: 5,
      description: 'Item 1 description edited',
    };
    const product = await request(app.getHttpServer())
      .put(`/products/items/${itemId}`)
      .send(data)
      .expect(200);

    expect(product.body.name).toEqual(data.name);
    expect(typeof product.body.price).toEqual('number');
    expect(product.body.price).toEqual(data.price);
    expect(product.body.description).toEqual(data.description);
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });
});

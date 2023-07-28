import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
// import { ValidaitonPipe } from '../src/pipe/validation.pipe';
import * as request from 'supertest';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { response } from 'express';
import { async } from 'rxjs';

describe('User (2e2)', () => {
  let app: INestApplication;
  let token: String;
  beforeAll(async () => {
    const moduleFicture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFicture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'me@gmail.com',
        password: 'Tfm@0417',
      });

    token = response.body.token;
    console.log(token);
  });

  it('/users (GET) --> 200 OK', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-type', /json/)
      .expect(200);
  });

  it('/users (GET) --> 401 "Unathorized" error', () => {
    return (
      request(app.getHttpServer())
        .get('/users')
        // .set('Authorization', `Bearer ${token}`)
        .expect('Content-type', /json/)
        .expect(401)
    );
  });

  // it('/auth/registration (POST) --> 201', async () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/registration')
  //     .send({
  //       name: 'user22345111',
  //       email: 'user224a54@gmail.com',
  //       password: 'Uzbek1$t0n',
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect(201)
  //     .then((response) => {
  //       expect(response.body).toMatchObject({
  //         token: expect.any(String),
  //       });
  //     });
  // });

  it('/auth/registration (POST) --> 400', async () => {
    return request(app.getHttpServer())
      .post('/auth/registration')
      .send({
        name: 'user22345111',
        email: 'user224a54@gmail.com',
        password: 'Uzbek1$t0n',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Bunday foydalanuvchi mavjud',
      });
  });

  // it('/auth/registration (POST) --> 400', async () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/registration')
  //     .send({
  //       name: 'user22345111',
  //       password: '1245',
  //       email: 'alisidn@gmail.com',
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect(400)
  //     .expect({
  //       statusCode: 400,
  //       message: ['Password is not strong enaugh'],
  //       error: 'Bad request',
  //     });
  // });

  it('/users/activate (POST) --> 200', async () => {
    return request(app.getHttpServer())
      .post('/users/activate')
      .send({
        userId: 10,
        value: 'ADMIN',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        id: 10,
        name: 'Tolib',
        email: 'tolibadmin@gmail.com',
        password:
          '$2b$07$10leK/1yhEBD6Herr24nUuWnQKJZ1ZU748hbjzO4OcgwbqdyvNtty',
        is_active: true,
        createdAt: '2023-07-24T07:09:48.606Z',
        updatedAt: '2023-07-24T07:15:56.460Z',
      });
  });

  it('/users/activate (POST) --> 404', async () => {
    return request(app.getHttpServer())
      .post('/users/activate')
      .send({
        userId: 100,
        value: 'ADMIN',
      })
      .expect('Content-Type', /json/)
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Foydalanuvchi topilmadi',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

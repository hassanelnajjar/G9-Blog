/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
// @ts-nocheck
/* eslint-disable no-undef */
require('env2')('./config.env');
const request = require('supertest');
const app = require('../src/app');
const build = require('../src/database/config/build');
const connection = require('../src/database/config/connection');

describe('Test Routes', () => {
  beforeAll(() => build('schema').then(() => build('testData')));

  afterAll(() => connection.end());

  let token = '';

  test('POST /api/v1/register', (done) => {
    request(app)
      .post('/api/v1/register')
      .send({
        userName: 'test', userEmail: 'test@gmail.com', userPassword: '123456', userPassword2: '123456',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text).msg).toBe('success registration');
        return done();
      });
  });

  test('POST /api/v1/login', (done) => {
    request(app)
      .post('/api/v1/login')
      .send({ userEmail: 'test@gmail.com', userPassword: '123456' })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        token = res.header['set-cookie'][0].split(';')[0].split('=')[1];
        console.log(token);
        expect(JSON.parse(res.text).msg).toBe('logged in successfully');
        done();
      });
  });

  test('GET /api/v1/posts', (done) => request(app)
    .get('/api/v1/posts')
    .expect(200)
    .set('Cookie', [`userToken=${token}`])
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(JSON.parse(res.text).data.length).toBe(1);
      done();
    }));
  test('GET /api/v1/comments/:postId', (done) => request(app)
    .get('/api/v1/comments/1')
    .set('Cookie', [`userToken=${token}`])
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(JSON.parse(res.text).data.length).toBe(1);
      done();
    }));

  test('POST /api/v1/add-comment/:postId', (done) => request(app)
    .post('/api/v1/add-comment/1')
    .set('Cookie', [`userToken=${token}`])
    .send({ text_content: 'hi' })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(JSON.parse(res.text).msg).toBe('success');
      done();
    }));

  test('POST /api/v1/add-post', (done) => request(app)
    .post('/api/v1/add-post')
    .send({ text_content: 'hi', username: 'alaa' })
    .set('Cookie', [`userToken=${token}`])
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(JSON.parse(res.text).msg).toBe('success');
      done();
    }));
});

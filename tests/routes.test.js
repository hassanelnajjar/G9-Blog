// @ts-nocheck
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');
const build = require('../src/database/config/build');
const connection = require('../src/database/config/connection');

describe('Test Routes', () => {
  beforeEach(() => build('schema').then(() => build('testData')));

  afterAll(() => connection.end());
  test('GET /api/v1/posts', (done) => request(app)
    .get('/api/v1/posts')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(JSON.parse(res.text).data.length).toBe(1);
      done();
    }));
  test('GET /api/v1/comments/:postId', (done) => request(app)
    .get('/api/v1/comments/1')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(JSON.parse(res.text).data.length).toBe(1);
      done();
    }));
  test('POST /api/v1/add-comment/:postId/:username', (done) => request(app)
    .post('/api/v1/add-comment/1/alaa')
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
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(JSON.parse(res.text).msg).toBe('success');
      done();
    }));
});

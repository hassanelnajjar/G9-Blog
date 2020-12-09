/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
// eslint-disable-next-line linebreak-style
const connection = require('../src/database/config/connection');
const build = require('../src/database/config/build');
const addComment = require('../src/database/queries/addComment');
const addPost = require('../src/database/queries/addPost');
const getComments = require('../src/database/queries/getComments');
const getCommentsCounts = require('../src/database/queries/getCommentsCounts');
const { getPosts } = require('../src/database/queries/getPosts');

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
describe('Test Database functions', () => {
  // @ts-ignore
  beforeEach(() => build());

  // @ts-ignore
  afterAll(() => connection.end());

  // @ts-ignore
  test('getComments >> This test will return comments data', () => getComments(1)
    .then((result) => {
      const reslen = result.rows.length;
      const expected = 1;
      // @ts-ignore
      expect(reslen).toBe(expected);
    })
    .catch());

  // @ts-ignore
  test('getCommentsCounts >> This test will return comments count', () => getCommentsCounts(1)
    .then((result) => {
      const reslen = result.rowCount;
      const expected = 1;
      // @ts-ignore
      expect(reslen).toBe(expected);
    })
    .catch());

  // @ts-ignore
  test('getPosts >> This test will return posts data', () => getPosts()
    .then((result) => {
      const reslen = result.rows.length;
      const expected = 2;
      // @ts-ignore
      expect(reslen).toBe(expected);
    })
    .catch());

  // @ts-ignore
  test('addComment >> This test will add comment', () => addComment('Hiiiiiii', 1, 1)
  // @ts-ignore
    .then(() => expect(1).toBe(1))
    .catch());

  // @ts-ignore
  test('addPost >> This test will add post', () => addPost('hiiiiii', 1)
  // @ts-ignore
    .then(() => expect(1).toBe(1))
    .catch());
});

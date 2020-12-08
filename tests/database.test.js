/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
// eslint-disable-next-line linebreak-style
const connection = require('../src/database/config/connection');
const build = require('../src/database/config/build');
const addComment = require('../src/database/queries/addComment');
const addPost = require('../src/database/queries/addPost');
const getComments = require('../src/database/queries/getComments');
const getCommentsCounts = require('../src/database/queries/getCommentsCounts');
const getPosts = require('../src/database/queries/getPosts');

test('', () => {
  const expected = 1;
  const actual = 1;
  expect(expected).toBe(actual);
});

test('getComments >> This test will return comments data', () => getComments(1)
  .then((result) => {
    const reslen = result.length;
    const expected = 5;
    expect(reslen).toBe(expected);
  })
  .catch());

test('getCommentsCounts >> This test will return comments count', () => getCommentsCounts(1)
  .then((result) => {
    const reslen = result;
    const expected = 5;
    expect(reslen).toBe(expected);
  })
  .catch());

test('getPosts >> This test will return posts data', () => getPosts()
  .then((result) => {
    const reslen = result.length;
    const expected = 5;
    expect(reslen).toBe(expected);
  })
  .catch());

test('addComment >> This test will add comment', () => addComment(post_id, user_name, text_content)
  .then(() => expect(1).toBe(1))
  .catch());

test('addPost >> This test will add post', () => addPost(text_content, user_name)
  .then(() => expect(1).toBe(1))
  .catch());

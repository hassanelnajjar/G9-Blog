/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
const postsContainer = document.getElementById('posts-container');
const submitButton = document.getElementById('submit-button');
const textContentInput = document.getElementById('text-content');
const userNameAtDom = document.getElementById('userNameAtDom');

const getPosts = () => fetch('/api/v1/posts')
  .then((res) => res.json())
  .then((results) => {
    if (results.status === 200) {
      const { data } = results;
      postsContainer.append(
        ...data.map((el) => createPosts(
          el.postid,
          el.post_text,
          el.user_name,
          calculatePassTime(el.posted_at_time),
          el.count,
        )),
      );
      return;
    }
    throw Error();
  })
  .catch(() => {
    postsContainer.innerText = 'No Data ...!';
  });

const addPost = (data) => {
  fetch('/api/v1/add-post', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      location.reload();
    })
    .catch(console.log);
};

const getUserName = () => fetch('api/v1/userName')
  .then((res) => res.json())
  .then(({ data }) => {
    userNameAtDom.innerText = data;
  });

window.addEventListener('load', () => {
  getUserName();
  getPosts();
});

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (!textContentInput.value.trim()) {
    return;
  }
  addPost({
    text_content: textContentInput.value.trim(),
  });
});

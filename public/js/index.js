/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
const postsContainer = document.getElementById('posts-container');
const submitButton = document.getElementById('submit-button');
const username = document.getElementById('username');
const textContentInput = document.getElementById('text-content');

const handleDeleteClick = (postId) => {
  fetch('/api/v1/delete', {
    method: 'DELETE',
    body: JSON.stringify({ postId }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => location.reload()).catch(console.log);
};

const handleCommentClick = (id) => {
  location.href = '../comments.html';
  localStorage.setItem('postId', id);
};

fetch('/api/v1/posts')
  .then((res) => res.json())
  .then((results) => {
    if (results.status === 200) {
      const { data } = results;
      postsContainer.append(...data.map((el) => createPosts(el.id, el.post_text, el.user_name, el.posted_at_time)));
      return;
    }
    throw Error();
  })
  .catch(() => { postsContainer.innerText = 'No Data ...!'; });

submitButton.addEventListener('click', () => {
  if (!username.value.trim() || !textContentInput.value.trim()) {
    return;
  }
  const data = {
    username: username.value,
    text_content: textContentInput.value,
  };

  fetch('/api/v1/add-post', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  }).then((res) => res.json()).then(() => {
    location.reload();
  }).catch(console.log);
});

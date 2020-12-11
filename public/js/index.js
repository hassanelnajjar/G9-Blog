/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
const postsContainer = document.getElementById('posts-container');
const submitButton = document.getElementById('submit-button');
const username = document.getElementById('username');
const textContentInput = document.getElementById('text-content');

fetch('/api/v1/posts')
  .then((res) => res.json())
  .then((results) => {
    if (results.status === 200) {
      const { data } = results;
      postsContainer.append(...data.map((el) => createPosts(el.postid, el.post_text, el.user_name, calculatePassTime(el.posted_at_time), el.count)));
      return;
    }
    throw Error();
  })
  .catch(() => { postsContainer.innerText = 'No Data ...!'; });

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (!username.value.trim() || !textContentInput.value.trim()) {
    return;
  }
  const data = {
    username: username.value.trim(),
    text_content: textContentInput.value.trim(),
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

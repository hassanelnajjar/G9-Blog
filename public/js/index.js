/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
const postsContainer = document.getElementById('posts-container');
const postCommentsContainer = document.getElementById('post-comments-container');
const submitButton = document.getElementById('submit-button');
const username = document.getElementById('username');
const textContentInput = document.getElementById('text-content');

const createPosts = (
  id, textContent, username, timestamp,
) => {
  const componentDiv = document.createElement('div');
  componentDiv.classList.add('posts-post-component');
  const usernameDiv = document.createElement('div');
  usernameDiv.classList.add('posts-username');
  usernameDiv.textContent = username;
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('posts-text-content');
  const textParg = document.createElement('p');
  textParg.innerText = textContent;
  contentDiv.appendChild(textParg);
  const componentFooterDiv = document.createElement('div');
  componentFooterDiv.classList.add('posts-post-comment-footer');
  const heartDiv = document.createElement('div');
  const heartI = document.createElement('i');
  heartI.classList.add('fas', 'fa-heart');
  heartDiv.appendChild(heartI);
  const commentDiv = document.createElement('div');
  const commentI = document.createElement('i');
  commentI.classList.add('far', 'fa-comment');
  commentI.addEventListener('click', () => {
    handleCommentClick(id);
  });
  commentDiv.appendChild(commentI);
  const timeStampDiv = document.createElement('div');
  timeStampDiv.textContent = timestamp;
  componentFooterDiv.append(heartDiv, commentDiv, timeStampDiv);
  componentDiv.append(usernameDiv, contentDiv, componentFooterDiv);
  return componentDiv;
};

const createComments = (
  textContent, timestamp, userName,
) => {
  const componentDiv = document.createElement('div');

  componentDiv.classList.add('posts-post-component', 'comment-background');

  const usernameDiv = document.createElement('div');
  usernameDiv.classList.add('posts-username');
  usernameDiv.textContent = userName;
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('posts-text-content');
  const textParg = document.createElement('p');
  textParg.innerText = textContent;
  contentDiv.appendChild(textParg);
  const componentFooterDiv = document.createElement('div');
  componentFooterDiv.classList.add('posts-post-comment-footer');
  const heartDiv = document.createElement('div');
  const heartI = document.createElement('i');
  heartI.classList.add('fas', 'fa-heart');
  heartDiv.appendChild(heartI);
  const commentDiv = document.createElement('div');
  const commentI = document.createElement('i');
  commentI.classList.add('far', 'fa-comment');
  commentDiv.appendChild(commentI);
  const timeStampDiv = document.createElement('div');
  timeStampDiv.textContent = timestamp;
  componentFooterDiv.append(heartDiv, commentDiv, timeStampDiv);
  componentDiv.append(usernameDiv, contentDiv, componentFooterDiv);
  return componentDiv;
};

const handleCommentClick = (id) => {
  fetch(`/api/v1/posts/${id}`).then((res) => res.json()).then((results) => {
    if (results.status === 200) {
      const { data } = results;
      postCommentsContainer.append(...data.map((el) => createPosts(el.id, el.post_text, el.user_name, el.posted_at_time)));
      return;
    }
    throw new Error();
  }).catch(() => { postCommentsContainer.innerText = 'No Data ...!'; });

  fetch(`/api/v1/comments/${id}`).then((res) => res.json()).then((results) => {
    if (results.status === 200) {
      const { data } = results;
      postCommentsContainer.append(...data.map((el) => createComments(el.comment_text_content, el.commented_at_time, el.user_name)));
      return;
    }
    throw new Error();
  }).catch(() => { postCommentsContainer.innerText = 'No Data ...!'; });
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

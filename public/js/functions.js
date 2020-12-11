/* eslint-disable no-unused-expressions */
const handleCommentClick = (id) => {
  location.href = '../comments.html';
  localStorage.setItem('postId', id);
};

const handleDeleteClick = (postId) => {
  fetch('/api/v1/delete', {
    method: 'DELETE',
    body: JSON.stringify({ postId }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => location.reload())
    .catch(console.log);
};

const createPosts = (id, textContent, userName, timestamp, count) => {
  const componentDiv = document.createElement('div');
  componentDiv.classList.add('posts-post-component');
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
  commentDiv.innerText = count > 0 ? count : '';
  const commentI = document.createElement('i');
  commentI.classList.add('far', 'fa-comment');
  commentI.addEventListener('click', () => {
    handleCommentClick(id);
  });
  commentDiv.appendChild(commentI);
  const timeStampDiv = document.createElement('div');
  timeStampDiv.textContent = timestamp;
  componentFooterDiv.append(heartDiv, commentDiv, timeStampDiv);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerText = 'X';
  deleteButton.addEventListener('click', () => {
    handleDeleteClick(id);
  });

  componentDiv.append(
    usernameDiv,
    contentDiv,
    componentFooterDiv,
    deleteButton,
  );
  return componentDiv;
};

const createComments = (textContent, timestamp, userName) => {
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
  const timeStampDiv = document.createElement('div');
  timeStampDiv.textContent = timestamp;
  componentFooterDiv.append(heartDiv, timeStampDiv);
  componentDiv.append(usernameDiv, contentDiv, componentFooterDiv);
  return componentDiv;
};

const calculatePassTime = (x) => {
  const currentTime = Date.now();
  const time = new Date(x).getTime() + 3600000 * 2;
  const period = (currentTime - time) / 1000;
  const timeList = {
    0: 'second',
    60: 'minute',
    3600: 'hour',
    86400: 'day',
    604800: 'week',
    31449600: 'year',
  };
  const key = Object.keys(timeList).filter((k) => +k <= period).reverse()[0];
  const timeValue = period / +key;
  return `@ ${timeValue.toFixed(0)} ${timeList[key]}`;
};

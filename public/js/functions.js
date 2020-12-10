const createPosts = (
  id, textContent, userName, timestamp,
) => {
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

  componentDiv.append(usernameDiv, contentDiv, componentFooterDiv, deleteButton);
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

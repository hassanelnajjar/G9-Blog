const postsContainer = document.getElementById('posts-container');
const postCommentsContainer = document.getElementById('post-comments-container');
const submitButton = document.getElementById('submit-button');
const username = document.getElementById('username');
const textContentInput = document.getElementById('text-content');

const createPosts = ({
  id, textContent, username, timestamp,
}) => {
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
  commentI.addEventListener('click', (id) => {
    handleCommentClick(id);
  });
  commentDiv.appendChild(commentI);
  const timeStampDiv = document.createElement('div');
  timeStampDiv.textContent = timestamp;
  componentFooterDiv.append(heartDiv, commentDiv, timeStampDiv);
  componentDiv.append(usernameDiv, contentDiv, componentFooterDiv);
  return componentDiv;
};

const handleCommentClick = (postId) => {
  window.location.href = '#comments-section';
  fetch(`/api/v1/posts/${postId}`)
    .then((res) => res.json())
    .then((results) => {
      if (results.status === 200) {
        const { data } = results;
        postCommentsContainer.append(...data.map(createPosts));
      }
      throw Error();
    })
    .catch(() => { postCommentsContainer.innerText = 'No Post ...!'; });
  fetch(`/api/v1/comments/${postId}`)
    .then((res) => res.json())
    .then((results) => {
      if (results.status === 200) {
        const { data } = results;
        postCommentsContainer.append(...data.map(createPosts));
      }
      throw Error();
    })
    .catch(() => { postCommentsContainer.innerText = 'No Post ...!'; });
};
const data = [{
  id: 1, textContent: 'hello', username: 'hassan', timestamp: '5/5/2020',
}];
postsContainer.append(...data.map(createPosts));

// fetch('/api/v1/posts')
//   .then((res) => res.json())
//   .then((results) => {
//     if (results.status === 200) {
//       const { data } = results;
//       postsContainer.append(...data.map(createPosts));
//     }
//     throw Error();
//   })
//   .catch(() => { postsContainer.innerText = 'No Data ...!'; });

// Custom File Input :-
// const postImgSrc = document.getElementById('post-img-src');
// const custom_upload_btn = document.getElementById('custom_upload_btn');
// const custom_text_span = document.getElementById('custom_text_span');

// custom_upload_btn.onclick = () => {
// 	postImgSrc.click();
// };

// postImgSrc.addEventListener('change', () => {
// 	custom_text_span.innerHTML = postImgSrc.value;
// });

//

submitButton.addEventListener('click', () => {
  const data = {
    username: username.value,
    textContent: textContentInput.value,
  };
  fetch('/api/v1/add-post', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
});

const postCommentsContainer = document.getElementById(
  'post-comments-container',
);

const createCommentInput = (postId) => {
  const div = document.createElement('div');
  div.classList.add('add-comment-div');
  const form = document.createElement('form');
  form.classList.add('add-comment-form');
  form.method = 'POST';
  const textContentInput = document.createElement('textarea');
  textContentInput.placeholder = 'Enter your comment here ...';
  textContentInput.classList.add('add-comment-text-area', 'form-control');
  textContentInput.id = 'textContentInput';
  const commentSendButton = document.createElement('button');
  commentSendButton.classList.add('send-comment-button');
  commentSendButton.innerText = 'Add Comment';
  commentSendButton.addEventListener('click', (e) => {
    e.preventDefault();
    sendComment(postId, textContentInput.value);
  });
  form.append(textContentInput, commentSendButton);
  div.appendChild(form);
  return div;
};

const sendComment = (postId, textContentInput) => {
  if (!textContentInput.trim()) {
    return;
  }
  fetch(`/api/v1/add-comment/${postId}`, {
    method: 'POST',
    body: JSON.stringify({ text_content: textContentInput }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(({ status }) => {
      if (status === 200) {
        location.reload();
      }
    })
    .catch(console.log);
};

const getComments = (id) => {
  postCommentsContainer.append(createCommentInput(id));
  fetch(`/api/v1/posts/${id}`)
    .then((res) => res.json())
    .then((results) => {
      if (results.status === 200) {
        const { data } = results;
        postCommentsContainer.append(
          ...data.map((el) => createPosts(
            el.postid,
            el.post_text,
            el.user_name,
            calculatePassTime(el.posted_at_time),
            el.count,
          )),
        );
      }
    })
    .then(() => fetch(`/api/v1/comments/${id}`))
    .then((res) => res.json())
    .then((results) => {
      if (results.status === 200) {
        const { data } = results;
        postCommentsContainer.append(
          ...data.map((el) => createComments(
            el.comment_text_content,
            calculatePassTime(el.commented_at_time),
            el.user_name,
          )),
        );
        return;
      }
      throw new Error();
    })
    .catch(() => {
      postCommentsContainer.innerText = 'No Data ...!';
    });
};

const postId = localStorage.getItem('postId');
getComments(postId);

const postsContainer = document.getElementById('posts-container');
const postImgSrc = document.getElementById('post-img-src');
const custom_upload_btn = document.getElementById('custom_upload_btn');
const custom_text_span = document.getElementById('custom_text_span');
const submitButton = document.getElementById('submit-button');
const username = document.getElementById('username');
const textContentInput = document.getElementById('text-content');
const createPosts = ({textContent, username, timestamp}) => {
	const componentDiv = document.createElement('div');
	div.classList.add('posts-post-component');
	const usernameDiv = document.createElement('div');
	usernameDiv.classList.add('posts-username');
	usernameDiv.textContent = username;
	const contentDiv = document.createElement('div');
	contentDiv.classList.add('posts-text-content');
	const textParg = document.createElement('p');
	p.innerText = textContent;
	contentDiv.appendChild(textParg);
	const componentFooterDiv = document.createElement('div');
	componentFooterDiv.classList.add('posts-post-comment-footer');
	const heartDiv = document.createElement('div');
	const heartI = document.createElement('i');
	heartI.classList.add('fas fa-heart');
	heartDiv.appendChild(heartI);
	const commentDiv = document.createElement('div');
	const commentI = document.createElement('i');
	commentI.classList.add('far fa-comment');
	commentDiv.appendChild(commentI);
	const timeStampDiv = document.createElement('div');
	timeStampDiv.textContent = timestamp;
	componentFooterDiv.append(heartDiv, commentDiv, timeStampDiv);
	componentDiv.append(usernameDiv, contentDiv, componentFooterDiv);
	return componentDiv;
};

fetch('/api/v1/posts')
	.then((res) => res.json())
	.then((results) => {
		if (results.status === 200) {
			const {data} = results;
			postsContainer.append(...data.map(createPosts));
		}
		throw Error();
	})
	.catch((err) => (postsContainer.innerText = 'No Data ...!'));

//Custom File Input :-

// custom_upload_btn.onclick = () => {
// 	postImgSrc.click();
// };

// postImgSrc.addEventListener('change', () => {
// 	custom_text_span.innerHTML = postImgSrc.value;
// });

//

submitButton.addEventListener('click', (event) => {
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

const postId = window.location.pathname.split('/')[2];

const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentContent = document.querySelector('#inputComment').value;

  if(commentContent) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({postId: postId, comment: commentContent}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.reload();
    } else {
      console.log(response);
    }
  };
}

document
  .querySelector('#btnSubmitComment')
  .addEventListener('click', commentFormHandler);

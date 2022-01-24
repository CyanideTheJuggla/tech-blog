const deleteClicks = 0;
const postId = window.location.pathname.split('/')[3];
const alertError = document.querySelector('.alert');
const deleteButton = document.querySelector('#btnSubmitDelete');
const submitButton = document.querySelector('#btnSubmitEdit');

const editClickHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#postTitle').value;
    const postContent = document.querySelector('#postContent').value;

    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            postTitle,
            postContent,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    //console.log('response', response);

    if (response.ok) {
        alertError.className += 'alert-success';
        alertError.innerHTML = '<strong>Success!</strong> Your post was successfully edited. Redirecting...';
        alertSuccess();
        alertShow();
    } else {
        alertShow();
    }
    setTimeout(()=>{ document.location.replace(`/post/${postId}`) }, 2500);
};

const deleteClickHandler = async (event) => {
    event.preventDefault();
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });
    alertError.className += 'alert-success';
    alertError.innerHTML = '<strong>Success!</strong> Your post was successfully deleted.';
    alertSuccess();
    alertShow();
    setTimeout(()=>{ document.location.replace(`/dash`) }, 2500);
};

const alertSuccess = () => {
    const classList = [];
    alertError.classList.forEach(element => {
        if (!element.includes('alert-danger') ) {
            classList.push(element);
        }
    });
    classList.push('alert-success');
    alertError.className = classList.toString().replaceAll(',', ' ');
}

const alertShow = () => {
    const classList = [];
    alertError.classList.forEach(element => {
        if (!element.includes('d-none') ) {
            classList.push(element);
        }
    });
    alertError.className = classList.toString().replaceAll(',', ' ');
}

submitButton.addEventListener('click', editClickHandler);
deleteButton.addEventListener('click', deleteClickHandler);

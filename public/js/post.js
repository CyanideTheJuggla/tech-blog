const alertError = document.querySelector('.alert');
const newPostHandler = async function(event) {
    event.preventDefault();

    const postTitle = document.querySelector('#postTitle').value;
    const postContent = document.querySelector('#postContent').value;

    if(postTitle.length > 3 && postContent.length > 0){
        await fetch(`/api/post`, {
            method: 'POST',
            body: JSON.stringify({
            title: postTitle,
            content: postContent,
            }),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            if (res.ok) {
                document.location.replace('/dash');
            } else {
                alertShow();
            }
            document.location.replace('/');
        });
    } else {
        alertShow();
        document.querySelector('#btnSubmitPost').toggleAttribute('disabled');
    }
};

const alertShow = () => {
    const classList = [];
    alertError.classList.forEach(element => {
        if (!element.includes('d-none') ) {
            classList.push(element);
        }
    });
    alertError.className = classList.toString().replaceAll(',', ' ');
}

document.querySelector('#btnSubmitPost').addEventListener('click', newPostHandler);
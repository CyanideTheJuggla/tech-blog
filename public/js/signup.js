const signUpButton = document.querySelector('#btnSignUp');

const signupFormHandler = async function(event) {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    console.log('username', username);
    console.log('email', email);
    console.log('password', password);
    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
            username, email, password
        }),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
    if (response.id) {
        document.location.replace('/dash');
    } else {
        console.log('Failed to sign up', response);
    }
};

signUpButton.addEventListener('click', signupFormHandler);
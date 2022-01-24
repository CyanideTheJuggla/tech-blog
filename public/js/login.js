const loginButton = document.querySelector('#btnLogIn');
const blackout = document.querySelector('.blackout')
const loginFormHandler = async function(event) {
    event.preventDefault();
    loginButton.toggleAttribute('disabled');
    blackout.className += ' d-flex';
    const usernameEl = document.querySelector('#username');
    const passwordEl = document.querySelector('#password');
    console.log('\nusername', usernameEl.value);
    console.log('\npassword', passwordEl.value);
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        setInterval(()=>document.location.replace('/dash'), 750);
    } else {
        console.log('Failed to login');
        console.log('response', response);
    }
};
loginButton.addEventListener('click', loginFormHandler);
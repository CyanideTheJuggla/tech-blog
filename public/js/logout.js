const logout = async function() {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    setInterval(()=> document.location.replace('/login'), 750)
};

document.querySelector('#btnLogOut').addEventListener('click', logout);

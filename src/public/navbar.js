document.addEventListener('DOMContentLoaded', () => {
    const authButton = document.getElementById('authButton');
    const navbarNav = document.querySelector('.navbar-nav');

    const userData = getCookie('userData');

    if (userData) {
        const user = JSON.parse(decodeURIComponent(userData).substring(2)); 
        authButton.textContent = 'Signout';

        const greeting = document.createElement('span');
        greeting.textContent = 'Hola, ' + user.first_name;
        greeting.style.marginRight = '10px'; 

        navbarNav.insertBefore(greeting, authButton);
    } else {
        authButton.textContent = 'Signin';
    }

    authButton.addEventListener('click', () => {
        if (authButton.textContent === 'Signout') {
            window.location.href = "/logout";
        } else {
            window.location.href = "/login";
        }
    });
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
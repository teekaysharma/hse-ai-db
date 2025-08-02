// Simple auth check (replace with real auth in production)
function checkAuth() {
    return localStorage.getItem('hse-auth') === 'true';
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
}

function handleLogin() {
    // Replace with actual authentication
    localStorage.setItem('hse-auth', 'true');
    location.reload();
}


function submitForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.userId) {
            // Successful login
            const token = data.token;
            
            // Store the userId and token in localStorage
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('token', token);

            // Redirect or perform other actions as needed
            window.location.href = `dashboard.html`; 
        } else {
            // Failed login
            const errorMessage = data.message || 'Login failed';
            document.getElementById('errorMessage').innerText = errorMessage;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

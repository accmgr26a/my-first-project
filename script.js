// This "switch" starts as false (logged out)
let isAuthenticated = false; 
const mySecretKey = "1234"; // CHANGE THIS to your own pin/password

function processCommand(cmd) {
    let response = '';

    // 1. Check if the user is trying to login
    if (cmd.startsWith('login ')) {
        const passwordAttempt = cmd.split(' ')[1]; // Takes the word after 'login'
        if (passwordAttempt === mySecretKey) {
            isAuthenticated = true;
            response = 'ACCESS GRANTED. Welcome, Admin.';
        } else {
            response = 'ACCESS DENIED. Invalid Key.';
        }
    } 
    // 2. If not logged in, block all other commands
    else if (!isAuthenticated) {
        response = 'RESTRICTED AREA. Please type "login [your-key]" to proceed.';
    } 
    // 3. If logged in, allow access to data
    else {
        if (cmd === 'rent') {
            response = 'RENT RECORDS: March - Paid (£550) | April - Pending.';
        } else if (cmd === 'tax') {
            response = 'COUNCIL TAX: Account #88291 - Balance: £120.50.';
        } else if (cmd === 'logout') {
            isAuthenticated = false;
            response = 'Logged out successfully.';
        } else if (cmd === 'help') {
            response = 'Commands: rent, tax, logout, clear';
        } else {
            response = `Unknown command: ${cmd}`;
        }
    }

    displayOutput(cmd, response);
}

function displayOutput(cmd, response) {
    const line = document.createElement('p');
    line.innerHTML = `<span class="prompt">> ${cmd}</span><br>${response}`;
    output.appendChild(line);
    window.scrollTo(0, document.body.scrollHeight); // Auto-scroll to bottom
}

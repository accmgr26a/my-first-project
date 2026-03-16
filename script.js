alert("The brain is awake!");
const input = document.getElementById('command-input');
const output = document.getElementById('output');

// This listens for you hitting the "Enter" key
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = input.value.toLowerCase().trim();
        processCommand(command);
        input.value = ''; // This clears the box so you can type again
    }
});

function processCommand(cmd) {
    let response = '';

    if (cmd === 'help') {
        response = 'AVAILABLE COMMANDS: rent, tax, clear, status';
    } else if (cmd === 'rent') {
        response = 'RENT: All payments up to date. Next due: April 1st.';
    } else if (cmd === 'tax') {
        response = 'COUNCIL TAX: Reference #22A. Balance: £0.00.';
    } else if (cmd === 'clear') {
        output.innerHTML = '';
        return;
    } else {
        response = `Command not recognized: ${cmd}. Type "help" for a list.`;
    }

    // This part puts the text on the screen
    const line = document.createElement('p');
    line.innerHTML = `<span style="color: white;">> ${cmd}</span><br>${response}`;
    output.appendChild(line);
    
    // Auto-scroll so you always see the latest line
    window.scrollTo(0, document.body.scrollHeight);
}

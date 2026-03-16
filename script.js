const input = document.getElementById('command-input');
const output = document.getElementById('output');

// Our digital notepad for records
let logs = [
    { type: 'Rent', amount: 550, date: '2026-03-01', status: 'Paid' }
];

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const entry = input.value.trim();
        const args = entry.split(' '); // Splits "paid 100" into ["paid", "100"]
        const command = args[0].toLowerCase();
        
        execute(command, args.slice(1));
        input.value = '';
    }
});

function execute(cmd, params) {
    let response = '';

    if (cmd === 'help') {
        response = 'COMMANDS: view, add [type] [amount], clear';
    } 
    else if (cmd === 'view') {
        // Look through our logs and format them
        response = '--- CURRENT RECORDS ---\n';
        logs.forEach(log => {
            response += `${log.date} | ${log.type}: £${log.amount} (${log.status})\n`;
        });
    } 
    else if (cmd === 'add') {
        // Usage: add tax 120
        const type = params[0] || 'Misc';
        const amount = params[1] || 0;
        const newEntry = {
            type: type.charAt(0).toUpperCase() + type.slice(1),
            amount: amount,
            date: new Date().toISOString().split('T')[0],
            status: 'Recorded'
        };
        logs.push(newEntry);
        response = `SUCCESS: Added ${type} payment of £${amount}.`;
    }
    else if (cmd === 'clear') {
        output.innerHTML = '';
        return;
    } else {
        response = `Unknown command: ${cmd}`;
    }

    const line = document.createElement('div');
    line.innerHTML = `<span style="color: #fff;">> ${cmd} ${params.join(' ')}</span><br>${response}<br><br>`;
    output.appendChild(line);
    window.scrollTo(0, document.body.scrollHeight);
}

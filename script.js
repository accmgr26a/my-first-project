const input = document.getElementById('command-input');
const output = document.getElementById('output');

let logs = JSON.parse(localStorage.getItem('my_records')) || [
    { type: 'Rent', amount: 550, date: '2026-03-01', status: 'Paid' }
];

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const entry = input.value.trim();
        if (!entry) return; // Don't do anything if input is empty
        const args = entry.split(' ');
        const command = args[0].toLowerCase();
        execute(command, args.slice(1));
        input.value = '';
    }
});

function execute(cmd, params) {
    let response = '';

    if (cmd === 'help') {
        response = 'COMMANDS: view, add [type] [amount], total, clear, reset';
    } 
    else if (cmd === 'view') {
        response = '--- CURRENT RECORDS ---\n';
        logs.forEach(log => {
            response += `${log.date} | ${log.type}: £${log.amount} (${log.status})\n`;
        });
    } 
    else if (cmd === 'add') {
        const type = params[0] || 'Misc';
        const amount = params[1] || 0;
        const newEntry = {
            type: type.charAt(0).toUpperCase() + type.slice(1),
            amount: amount,
            date: new Date().toISOString().split('T')[0],
            status: 'Recorded'
        };
        logs.push(newEntry);
        localStorage.setItem('my_records', JSON.stringify(logs));
        response = `SUCCESS: Added ${type} payment of £${amount}.`;
    }
    else if (cmd === 'total') {
        let rTotal = 0, tTotal = 0;
        logs.forEach(l => {
            let v = parseFloat(l.amount) || 0;
            if (l.type.toLowerCase() === 'rent') rTotal += v;
            else if (l.type.toLowerCase() === 'tax') tTotal += v;
        });
            else if (cmd === 'export') {
        // 1. Format the data into a readable string
        let content = "RENT & TAX RECORDS\n==================\n\n";
        logs.forEach(log => {
            content += `${log.date} | ${log.type}: £${log.amount} (${log.status})\n`;
        });

        // 2. Create the file "Blob"
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        
        // 3. Create a hidden link and "click" it
        const a = document.createElement('a');
        a.href = url;
        a.download = `records_${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        
        // 4. Clean up
        window.URL.revokeObjectURL(url);
        response = "SUCCESS: File 'records.txt' generated. Check your Downloads.";
    }

        response = `RENT TOTAL: £${rTotal.toFixed(2)}\nTAX TOTAL:  £${tTotal.toFixed(2)}`;
    }
    else if (cmd === 'reset') {
        localStorage.removeItem('my_records');
        response = 'Memory cleared. Refresh the page to reset.';
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


    else if (cmd === 'total') {
        let rentTotal = 0;
        let taxTotal = 0;

        // Loop through the list and add up the amounts
        logs.forEach(log => {
            let val = parseFloat(log.amount);
            if (log.type.toLowerCase() === 'rent') {
                rentTotal += val;
            } else if (log.type.toLowerCase() === 'tax') {
                taxTotal += val;
            }
        });

        response = `--- FINANCIAL SUMMARY ---\n`;
        response += `Total Rent Paid: £${rentTotal.toFixed(2)}\n`;
        response += `Total Tax Paid:  £${taxTotal.toFixed(2)}\n`;
        response += `GRAND TOTAL:     £${(rentTotal + taxTotal).toFixed(2)}`;
    }

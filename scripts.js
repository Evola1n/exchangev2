document.getElementById('swapCurrencies').addEventListener('click', function() {
    let fromCurrency = document.getElementById('fromCurrency');
    let toCurrency = document.getElementById('toCurrency');

    // Меняем местами значения
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
});

function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive number for amount.');
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            if (!data.rates[toCurrency]) {
                throw new Error('Invalid currency data received.');
            }

            const exchangeRate = data.rates[toCurrency];
            const convertedAmount = amount * exchangeRate;
            document.getElementById('result').textContent = 
                `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error fetching currency exchange rate:', error);
            alert('Failed to fetch exchange rate. Please try again later.');
        });
}


function appendToDisplay(value) {
    document.getElementById('calculator-display').value += value;
}

function clearDisplay() {
    document.getElementById('calculator-display').value = '';
}

function calculate() {
    let display = document.getElementById('calculator-display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

function validateInput(input) {
    input.value = input.value.replace(/[^0-9+\-*/.]/g, '');
}


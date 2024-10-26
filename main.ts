console.log('Script loaded - version 7');

interface StockData {
    price: number;
    shares: number;
}

const apiKey = 'csek6s9r01qrf7qi1u6gcsek6s9r01qrf7qi1u70';
const stocks: { [symbol: string]: StockData } = {
    'AAPL': { price: 0, shares: 1 },
    'MSFT': { price: 0, shares: 1 },
    'GOOG': { price: 0, shares: 1 },
    'AMZN': { price: 0, shares: 1 },
    'META': { price: 0, shares: 1 },
    'NVDA': { price: 0, shares: 1 },
    'ORCL': { price: 0, shares: 1 },
    'IBM': { price: 0, shares: 1 },
    'CRM': { price: 0, shares: 1 },
    'INTC': { price: 0, shares: 1 }
};

function init() {
    console.log('Welcomeeeeeee to Limit Party');
    fetchStockPrices();
}

function fetchStockPrices() {
    console.log('Fetching stock prices...');
    let fetchCount = 0;
    for (const symbol in stocks) {
        fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                stocks[symbol].price = data.c; // 'c' represents the current price
                fetchCount++;
                if (fetchCount === Object.keys(stocks).length) {
                    calculateTotalValue();
                }
            })
            .catch(error => {
                console.error(`Error fetching data for ${symbol}:`, error);
                stocks[symbol].price = -1; // Use a sentinel value to indicate error
                fetchCount++;
                if (fetchCount === Object.keys(stocks).length) {
                    calculateTotalValue();
                }
            });
    }
}

function calculateTotalValue() {
    console.log('calculating total value');
    let totalValue = 0;
    for (const symbol in stocks) {
        totalValue += stocks[symbol].price * stocks[symbol].shares;
    }
    const totalValueElement = document.getElementById('total-value');
    if (totalValueElement) {
        totalValueElement.textContent = `Total Portfolio Value: $${totalValue.toFixed(2)}`;
    }
}

// This function can be called from the console to update shares
function updateShares(symbol: string, newShares: number) {
    if (symbol in stocks) {
        stocks[symbol].shares = newShares;
        calculateTotalValue();
    } else {
        console.error(`Stock symbol ${symbol} not found`);
    }
}


// Also set up event listener in case the DOM hasn't loaded yet
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    // You can put any additional initialization code here if needed
});

// Make updateShares available globally
(window as any).updateShares = updateShares;

console.log('Script loaded - version 7');
var apiKey = 'csek6s9r01qrf7qi1u6gcsek6s9r01qrf7qi1u70';
var stocks = {
    'AAPL': { price: 0, shares: 0 },
    'MSFT': { price: 0, shares: 0 },
    'GOOG': { price: 0, shares: 2.99419126894 },
    'AMZN': { price: 0, shares: 0 },
    'META': { price: 0, shares: 0 },
    'NVDA': { price: 0, shares: 0 },
    'ORCL': { price: 0, shares: 0 },
    'IBM': { price: 0, shares: 0},
    'CRM': { price: 0, shares: 0 },
    'INTC': { price: 0, shares: 0 }
};
function init() {
    console.log('Welcomeeeeeee to Limit Party');
    fetchStockPrices();
}
function fetchStockPrices() {
    console.log('Fetching stock prices...');
    var fetchCount = 0;
    var _loop_1 = function (symbol) {
        fetch("https://finnhub.io/api/v1/quote?symbol=".concat(symbol, "&token=").concat(apiKey))
            .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error! status: ".concat(response.status));
            }
            return response.json();
        })
            .then(function (data) {
            stocks[symbol].price = data.c; // 'c' represents the current price
            fetchCount++;
            if (fetchCount === Object.keys(stocks).length) {
                calculateTotalValue();
            }
        })
            .catch(function (error) {
            console.error("Error fetching data for ".concat(symbol, ":"), error);
            stocks[symbol].price = -1; // Use a sentinel value to indicate error
            fetchCount++;
            if (fetchCount === Object.keys(stocks).length) {
                calculateTotalValue();
            }
        });
    };
    for (var symbol in stocks) {
        _loop_1(symbol);
    }
}
function calculateTotalValue() {
    console.log('calculating total value');
    var totalValue = 0;
    for (var symbol in stocks) {
        totalValue += stocks[symbol].price * stocks[symbol].shares;
    }
    var totalValueElement = document.getElementById('total-value');
    if (totalValueElement) {
        totalValueElement.textContent = "Rösl zum bruuche: ".concat(totalValue.toFixed(2));
    }
}
// This function can be called from the console to update shares
function updateShares(symbol, newShares) {
    if (symbol in stocks) {
        stocks[symbol].shares = newShares;
        calculateTotalValue();
    }
    else {
        console.error("Stock symbol ".concat(symbol, " not found"));
    }
}
// Immediately invoke init
init();
// Also set up event listener in case the DOM hasn't loaded yet
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired');
    // You can put any additional initialization code here if needed
});
// Make updateShares available globally
window.updateShares = updateShares;

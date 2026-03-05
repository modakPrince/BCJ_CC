const express = require('express');
const axios = require('axios');
const app = express();

const exchangeRateApi = 'https://api.exchangerate-api.com/v4/latest/INR';

app.get('/convert', async (req, res) => {
    const { amount, to } = req.query;

    try {
        const response = await axios.get(exchangeRateApi);
        const exchangeRate = response.data.rates[to];

        if (!exchangeRate) {
            return res.status(400).json({ error: 'Invalid currency code' });
        }

        const convertedAmount = (amount * exchangeRate).toFixed(2);
        res.json({ convertedAmount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while converting currency' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Keep the process alive
process.on('SIGINT', () => {
    console.log('Server shutting down...');
    process.exit(0);
});

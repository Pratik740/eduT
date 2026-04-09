require('dotenv').config();
const express = require('express');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Main business routes
app.use('/', schoolRoutes);

// Health check endpoint
app.get('/health', (req, res) => res.status(200).send('OK'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

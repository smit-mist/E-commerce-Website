const express = require('express');

const app = express();
app.use(express.json());

// Importing Routes
const productRouters = require('./routes/productRoutes');
app.use('/api/v1', productRouters);

module.exports = app;
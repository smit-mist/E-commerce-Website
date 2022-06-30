const express = require('express');
const errorMiddleware = require('./middleware/error');
const app = express();
app.use(express.json());

// Importing Routes
const productRouters = require('./routes/productRoutes');
app.use('/api/v1', productRouters);

const userRoutes = require('./routes/userRoutes');
app.use('/api/v1', userRoutes);


app.use(errorMiddleware);
module.exports = app;
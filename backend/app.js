const express = require('express');
const errorMiddleware = require('./middleware/error');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
// Importing Routes
const productRouters = require('./routes/productRoutes');
app.use('/api/v1', productRouters);

const userRoutes = require('./routes/userRoutes');
app.use('/api/v1', userRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/v1', orderRoutes);


app.use(errorMiddleware);
module.exports = app;
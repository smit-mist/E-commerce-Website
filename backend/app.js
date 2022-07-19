const express = require('express');
const errorMiddleware = require('./middleware/error');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require("dotenv");
const cors = require('cors');


dotenv.config({ path: "backend/config/config.env" });

const app = express();
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });
  
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

const paymentRoutes = require('./routes/paymentRoute');
app.use('/api/v1', paymentRoutes);

app.use(errorMiddleware);
module.exports = app;
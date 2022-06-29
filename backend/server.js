const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: "backend/config/config.env" });

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on prot:- ${process.env.PORT}`);
});
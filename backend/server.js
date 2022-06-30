const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

process.on("uncaughtRejection", (err) => {
    console.log(`Error:- ${err}`);
    server.close(() => {
        console.log('Sever Shutting Down :(');
        process.exit(1);
    })
});

dotenv.config({ path: "backend/config/config.env" });


connectDB();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening on prot:- ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error:- ${err}`);
    server.close(() => {
        console.log('Sever Shutting Down :(');
        process.exit(1);
    })
});
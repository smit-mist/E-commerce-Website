const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cloudinary = require("cloudinary");

process.on("uncaughtRejection", (err) => {
  console.log(`Error:- ${err}`);
  server.close(() => {
    console.log("Sever Shutting Down :(");
    process.exit(1);
  });
});

dotenv.config({ path: "backend/config/config.env" });

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on prot:- ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error:- ${err}`);
  server.close(() => {
    console.log("Sever Shutting Down :(");
    process.exit(1);
  });
});

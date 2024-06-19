const app = require("./app");
const winston = require("winston");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

//Handling Uncaught Exceptions                                                                     ntw
process.on("uncaughtException", (err) => {
  winston.error(`Uncaught Exception: ${err.message}`, {
    timestamp: new Date().toISOString(),
    stack: err.stack,
  });
  winston.info("Shutting down the server due to Uncaught Exception");
  server.close(() => {
    setTimeout(() => {
      process.exit(1);
    }, 5000);
  });
});

//config
dotenv.config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cnnecting to databae
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

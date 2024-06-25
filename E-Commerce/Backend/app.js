const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

//config
dotenv.config({ path: "./config/config.env" });

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

//Route imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoute = require("./routes/paymentRoute");

//Middleware for erors
app.use(errorMiddleware);
app.use(cookieParser());

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoute);

module.exports = app;

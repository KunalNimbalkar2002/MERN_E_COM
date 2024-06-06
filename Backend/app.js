const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());

//Route imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoutes");

//Middleware for erors
app.use(errorMiddleware);
app.use(cookieParser());

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);

module.exports = app;

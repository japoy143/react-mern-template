const express = require("express");
require("dotenv").config();
require("colors");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

//cookie parser
const cookieParser = require("cookie-parser");

const app = express();

//PORT and Uri
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT | 3000;

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
//show all the method
app.use((req, res, next) => {
  console.log(req.path, req.method, req.params);
  next();
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`.blue);
    });
  })
  .then(() => console.log("Database Connected Successfully".blue))
  .catch((err) => console.log(err));

const userRoute = require("./routes/usersRoute");

app.use("/Users", userRoute);

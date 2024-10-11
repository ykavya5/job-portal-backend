const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");
const { incomingRequestLogger } = require("./middleware/index");

dotenv.config();
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const jobRouter = require("./routes/jobs");
const bodyParser = require("body-parser");
const connectDB = require('./config/db');

app.use(cors());


connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(incomingRequestLogger); //handling middleware

app.use("/api/v1", indexRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);



app.listen(process.env.PORT, ()=>{
    console.log("Server is running....")
})
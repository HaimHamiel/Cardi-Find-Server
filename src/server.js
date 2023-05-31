const express = require("express");
const cors = require("cors");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const {port} = require("./config/default");
const startCronJob = require("./config/cronJobs");


//Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes
const router = require("./routes");
app.use(router);

app.use(errorHandler);
startCronJob();

app.listen(port, () => console.log(`Server started on port ${port}`));

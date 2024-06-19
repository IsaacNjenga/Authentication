const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: `https://authentication-front.vercel.app/`,
    methods: ["POST", "GET"],
    credentials: true,
  })
);

//database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("err", err));

app.use("/", require("./routes/authRoutes"));

const port = 8000;
app.listen(port, () => console.log("Connected"));

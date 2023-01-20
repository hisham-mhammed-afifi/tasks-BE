require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const connect = require("./db/connect");
const taskRoutes = require("./routes/tasks.routes");
const userRoutes = require("./routes/users.routes");

// middlewares
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());

app.use(express.static("./public"));

// routes
app.use("/tasks", taskRoutes);
app.use("/auth", userRoutes);
connect(app);

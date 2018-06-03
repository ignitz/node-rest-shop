import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import productRoutes from "./api/routes/products";
import orderRoutes from "./api/routes/orders";

// Use env to added password
// ex: ...connect('mongodb://user:' + process.env.MONGO_PW + 'rest')
// note: no need to set useMongoClient: true
mongoose.connect("mongodb://localhost:27017");

// Remove Deprecation Warning
mongoose.Promise = global.Promise;

const app = express();

app.use(morgan("dev")); // log every connection... useful
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Autorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routers which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

export default app;

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
require("dotenv/config");

// Setting up express app
const app = express();

// Setting up CORS
app.use(cors());
app.options("*", cors);

// Contants
const api = process.env.API_URL;

// Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt(process.env.SECRET));
app.use(errorHandler);
// Decalaring public as static folder
app.use("/public/upload", express.static(__dirname + "/public/upload"));

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

// routers
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Setting up MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MondoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

// Listening on the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

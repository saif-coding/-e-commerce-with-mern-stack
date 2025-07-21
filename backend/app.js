const express = require("express");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
dotenv.config();
connectDB();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/users", UserRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/reviews", reviewRoutes);

const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));

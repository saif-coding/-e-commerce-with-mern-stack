const express = require("express");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./routes/userRoutes");
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

const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));

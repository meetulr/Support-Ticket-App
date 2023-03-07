const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello" });
});

app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
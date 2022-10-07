const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const cards = require("./routes/cards");
const updatebiz = require("./routes/updatebiz");
const cors = require("cors");

const PORT = process.env.PORT || 7000;
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/cards", cards);
app.use("/api/updatebiz", updatebiz);


app.use(cors());

app.listen(PORT, () => console.log("Server started on port", PORT));
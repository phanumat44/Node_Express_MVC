const express = require("express");
const { readdirSync } = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Config/db");
const app = express();
const port = 5000;

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

connectDB();

readdirSync('./Routes')
    .map((filename) => {
        app.use('/api', require("./Routes/" + filename));
    });

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

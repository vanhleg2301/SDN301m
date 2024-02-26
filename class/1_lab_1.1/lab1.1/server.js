import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import productRouter from "./route/products.js";
import tutorialsRouter from "./route/tutorials.js";
import bodyParser from "body-parser";


dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get("/", (req, res) => {
    res.send("<h1>Troi oi</h1>");
});
app.use("/tutorials",tutorialsRouter)
app.use("/product", productRouter);

app.listen(port, async () => {
    console.log("Server node Js running on " + port);
});

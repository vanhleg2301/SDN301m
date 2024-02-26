// Khai báo module express
import express, { json } from 'express';
import * as dotenv from 'dotenv';
import {productRouter,categoryRouter,commentRouter} from './route/index.js';
import connectDB from './database.js';
import cors from "cors"
import bodyParser from 'body-parser';

dotenv.config();
// Định nghĩa 1 webserver
const app = express();
app.use(
    cors({
      origin: process.env.CLIENT,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, 
    })
  );
  app.use(bodyParser.json({ limit: '10mb' }));
// Kích hoạt middleware cho phép Express server làm việc với dữ liệu JSON
// app.use(json());

app.get('/', (req, res) => {
    res.send("Welcome to Home page!");
});

app.use('/products',productRouter);
app.use('/category',categoryRouter);
app.use('/comment',commentRouter);


const port = process.env.PORT || 8080;

app.listen(port, async () => {
    connectDB();
    console.log(`Web server running on: http://localhost:${port}`);
});
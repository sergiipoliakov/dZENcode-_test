import 'dotenv/config'
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { Server } from 'socket.io';
import { setupSocket } from './socket';
import errorHandler from './middleware/ErrorHandlingMiddleware'
import router from './routers/index'

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const PORT = process.env.SERVER_PORT || 4000;
console.log('🚀 ~ app.ts:19 ~ process.env.DB_CONNECTION_STRING:', process.env.DB_CONNECTION_STRING)

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

setupSocket(io);

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

console.log('🚀 ~ app.ts:44 ~ process.env.CLIENT_URL:', process.env.CLIENT_URL)


app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

mongoose
  .connect(DB_CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error(`DB connection error: ${err.message}`);
    }
  });

app.use('/api', router);

app.use(errorHandler);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

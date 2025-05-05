import 'dotenv/config'
import express from 'express';
import http from 'http';
import mongoose from './mongooseeConnection';
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

const PORT = process.env.SERVER_PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

setupSocket(io);

app.use(cors({
  origin: '*', // process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

mongoose()
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error(`DB connection error: ${err.message}`);
    }
  });

app.use('/api', router);

app.use(errorHandler);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

import 'dotenv/config';
import http from 'http';
import cors from 'cors';
import express from 'express';
import socketIo from 'socket.io';

import { routes } from './routes';
import { ioMiddleware } from './middleware/ioMiddleware';

const app = express();

const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`Usuario conectado no socket ${socket.id}`);
});

app.use(ioMiddleware(io));
app.use(cors());
app.use(express.json());
app.use(routes);

// eslint-disable-next-line no-console
server.listen(4000, () => console.log('🔥 Server Running at http://localhost:4000'));

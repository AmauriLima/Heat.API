import express from 'express';
import { routes } from './routes';

const app = express();

app.use(routes);

// eslint-disable-next-line no-console
app.listen(4000, () => console.log('🔥 Server Running at http://localhost:4000'));

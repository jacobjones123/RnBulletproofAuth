import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.use('/auth', authRouter);

app.use(errorHandler);

const port = Number(process.env.PORT || 4000);
const host = '0.0.0.0';

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, host, () => {
    console.log(`API listening on http://${host}:${port}`);
  });
}

export default app;

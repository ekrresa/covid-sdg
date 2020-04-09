import express from 'express';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';

import { getDurationInMilliseconds, writeToFile } from './helpers';
import covidRouter from './routes';

dotenv.config();
const app = express();

const { PORT } = process.env;

app.use(cors());
app.use((req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = getDurationInMilliseconds(start);
    const log = `${req.method}\t\t${req.originalUrl}\t\t${res.statusCode}\t\t${diff}ms\n`;
    writeToFile(log);
  });

  next();
});
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/on-covid-19', covidRouter);

app.get('/', (_req, res) => res.json({ data: 'hello world' }));

app.use('*', (_req, res) => {
  res.status(404).send({ error: 'request does not match any endpoint' });
});

http.createServer(app).listen(PORT, console.log(`server listening on ${PORT}`));

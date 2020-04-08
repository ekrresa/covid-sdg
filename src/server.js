import express from 'express';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import morgan from 'morgan';

import covidRouter from './routes';

dotenv.config();
const app = express();

const { NODE_ENV, PORT } = process.env;
const logFormat = NODE_ENV === 'production' ? 'combined' : 'dev';

app.use(
  morgan(logFormat, {
    skip(_req, res) {
      if (NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode <= 500;
    },
    stream: process.stderr
  })
);

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/on-covid-19', covidRouter);

app.get('/', (_req, res) => res.json({ data: 'hello world' }));

http.createServer(app).listen(PORT, console.log(`server listening on ${PORT}`));

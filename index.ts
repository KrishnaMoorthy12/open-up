import express from 'express';
import chalk from 'chalk';
import Logger from 'js-logger';
import 'dotenv/config';

import { requestLogger } from './api/middlewares';
import APIRouter from './api/router';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_SERVER;

Logger.useDefaults({
  defaultLevel: process.env.NODE_ENV === 'production' ? Logger.ERROR : Logger.DEBUG,
  formatter: messages => {
    messages.unshift(
      `[${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString()}]`
    );
  }
});

const server = express();

server.use(requestLogger);
server.use(express.json());

server.use('/api', APIRouter);

server.get('*', (_req, res) => {
  res.sendStatus(200);
});

server.listen(PORT, async () => {
  Logger.info(`Server started at port ${chalk.magenta(PORT)}.`);
  Logger.info(`Listening for requests at ${chalk.cyan(`http://127.0.0.1:${PORT}`)}.`);

  try {
    Logger.debug(`Database server is at ${chalk.cyan(DB_URI)}.`);
    const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
    await mongoose.connect(DB_URI!, options);
    Logger.info(`Database connection ${chalk.greenBright('successful.')}`);
  } catch (err) {
    Logger.info(`Database connection ${chalk.redBright('failed.')}`);
    Logger.error(`Error: could not connect to the database at ${DB_URI}\n`, err);
  }
});

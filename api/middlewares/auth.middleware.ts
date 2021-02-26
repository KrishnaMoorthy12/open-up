import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import Logger from 'js-logger';
import 'dotenv/config';

import { IToken } from '../types';

const AUTH_SECRET = process.env.AUTH_SECRET!;

export const authenticatedOnly = (req: Request, res: Response, next: NextFunction) => {
  const {
    headers: { authorization }
  } = req;

  const token = authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Not authorized.');
  }

  Logger.debug(`The token is: ${chalk.bold(token)}.`);

  try {
    const user = jwt.verify(token, AUTH_SECRET) as IToken;
    req.body.loggedInUser = user;
    Logger.debug('User verified.');
    next();
  } catch (err) {
    return res.status(401).send('Not authorized.');
  }
};

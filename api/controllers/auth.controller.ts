import Express from 'express';
import Logger from 'js-logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import 'dotenv/config';

import { User } from '../models';

const AUTH_SECRET = process.env.AUTH_SECRET!;

/*
 * @route: /api/auth/login
 * @method: POST
 * requires: body { username, password }
 * response: <JWT Token>
 */

export const login = async (req: Express.Request, res: Express.Response) => {
  const {
    body: { username, password }
  } = req;
  try {
    const userDocument = await User.findOne({ username });
    if (!userDocument) return res.send('User not found');
    const isAuthenticated = bcrypt.compareSync(password, userDocument.password);

    if (isAuthenticated) {
      const token = jwt.sign({ username }, AUTH_SECRET, { expiresIn: '24h' });
      Logger.debug('Login successful.');
      res.setHeader('authorization', `Bearer ${token}`);
      return res.send(token);
    } else {
      return res.send('Wrong password');
    }
  } catch (err) {
    Logger.debug(chalk.red('Error: '), err);
  }
};

import bcrypt from 'bcrypt';
import chalk from 'chalk';
import { Request, Response } from 'express';
import Logger from 'js-logger';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { User } from '../models';

const AUTH_SECRET = process.env.AUTH_SECRET!;

/*
 * @route: /api/auth/login
 * @method: POST
 * requires: body { username, password }
 * response: <JWT Token>
 */

export const login = async (req: Request, res: Response) => {
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
      return res.status(200).json({ message: 'Authorized', data: token });
    } else {
      return res.status(401).json({ message: 'Wrong password' });
    }
  } catch (err) {
    Logger.debug(chalk.red('Error: '), err);
  }
};

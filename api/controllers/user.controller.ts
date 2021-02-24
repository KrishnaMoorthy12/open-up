import Express from 'express';
import Logger from 'js-logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import 'dotenv/config';

import { IToken } from '../types';
import { User } from '../models';

const AUTH_SECRET = process.env.AUTH_SECRET!;

export const newUser = async (req: Express.Request, res: Express.Response) => {
  const { body } = req;
  Logger.debug('Acknowledged: ', body);
  const theNewUser = new User({ ...body, password: bcrypt.hashSync(body.password, 10) });

  try {
    await theNewUser.save();
    Logger.debug('New user created successfully.');
    return res.status(200).send('User created successfully');
  } catch (err) {
    Logger.debug(err);
    return res.send('Could not create your account');
  }
};

export const updateUser = async (req: Express.Request, res: Express.Response) => {
  const {
    body,
    headers: { authorization }
  } = req;

  const token = authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Not authorized');
  }

  Logger.debug(`The token is: ${chalk.bold(token)}.`);
  const user = jwt.verify(token, AUTH_SECRET) as IToken;

  try {
    await User.findOneAndUpdate({ username: user.username }, body);
  } catch (err) {
    Logger.debug('Error occurred', err);
    return res.send('Could not update you account');
  }
};

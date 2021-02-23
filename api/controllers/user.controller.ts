import Express from 'express';
import Logger from 'js-logger';
import bcrypt from 'bcrypt';

import { User } from '../models';

export const newUser = async (req: Express.Request, res: Express.Response) => {
  const { body } = req;
  Logger.debug(body);
  const theNewUser = new User({ ...body, password: bcrypt.hashSync(body.password, 10) });

  try {
    await theNewUser.save();
    Logger.debug('New user created successfully');
    return res.status(200).send('User created successfully');
  } catch (error) {
    return res.send(error);
  }
};

import Express from 'express';
import Logger from 'js-logger';
import bcrypt from 'bcrypt';
import 'dotenv/config';

import { User } from '../models';

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
  const { loggedInUser, ...body } = req.body;

  try {
    await User.findOneAndUpdate({ username: loggedInUser.username }, body);
    Logger.debug('User updated successfully.');
  } catch (err) {
    Logger.debug('Error occurred: ', err);
    return res.send('Could not update you account');
  }
};

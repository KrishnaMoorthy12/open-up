import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Logger from 'js-logger';

import { User } from '../models';

/*
 * New User
 *
 * @route: /api/user/new
 * @method: POST
 * requires: body { username, name, bio?, email, password }
 * response: 'User created successfully' | 'Could not create your account'
 */

export const newUser = async (req: Request, res: Response) => {
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

/*
 * Update User
 *
 * @route: /api/user/update
 * @method: POST
 * requires: body { username?, name?, bio?, email?, password? }
 * response: 'User updated successfully' | 'Could not update your account'
 */

export const updateUser = async (req: Request, res: Response) => {
  const { loggedInUser, ...body } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: loggedInUser.username },
      { $set: { ...body } }
    );
    await updatedUser?.save();
    Logger.debug('User updated successfully.');
  } catch (err) {
    Logger.debug('Error occurred: ', err);
    return res.send('Could not update you account');
  }
};

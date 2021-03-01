import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Logger from 'js-logger';
import 'dotenv/config';

import { User } from '../models';

const SALT_ROUNDS = +process.env.SALT_ROUNDS!;

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
  const theNewUser = new User({ ...body, password: bcrypt.hashSync(body.password, SALT_ROUNDS) });

  try {
    const { password, __v, ...userInCollection } = await theNewUser.save();
    Logger.debug('New user created successfully.');
    return res.status(200).json({ message: 'User created successfully', data: userInCollection });
  } catch (err) {
    Logger.debug(err);
    return res.status(500).json({ message: 'Could not create your account' });
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
    let newDetails = { ...body };
    if (body.password) newDetails.password = bcrypt.hashSync(body.password, SALT_ROUNDS);
    const updatedUser = await User.findOneAndUpdate(
      { username: loggedInUser.username },
      { $set: newDetails },
      { useFindAndModify: false }
    );

    const { password, __v, ...userInCollection } = await updatedUser!.save();
    Logger.debug('User updated successfully.');
    return res.status(200).json({ message: 'User update successfully', data: userInCollection });
  } catch (err) {
    Logger.debug('Error occurred: ', err);
    return res.status(500).json({ message: 'Could not update you account' });
  }
};

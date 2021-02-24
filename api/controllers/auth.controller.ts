import Express from 'express';
import Logger from 'js-logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import 'dotenv/config';

import { IToken } from '../types';
import { User } from '../models';

const AUTH_SECRET = process.env.AUTH_SECRET!;

export const login = async (req: Express.Request, res: Express.Response) => {
  const { body } = req;
};

export const verify = async (req: Express.Request, res: Express.Response) => {
  const {
    body,
    headers: { authorization }
  } = req;

  Logger.debug(authorization);
};

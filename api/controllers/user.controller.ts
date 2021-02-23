import Express from 'express';

export const newUser = (req: Express.Request, res: Express.Response) => {
  res.send(req.params.id);
};

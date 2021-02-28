import { Request, Response } from 'express';
import Logger from 'js-logger';

import { Comment } from '../models';

/*
 * New Comment
 *
 * @route: /api/post/comment
 * @method: POST
 * requires: body { parent, post, author, is_anonymous?, body, upvotes?, downvotes?, depth? }
 * response: 'Comment posted successfully' | 'Could not post your comment'
 */

export const newComment = async (req: Request, res: Response) => {
  const { loggedInUser, ...body } = req.body;
  const commentDocument = { author: loggedInUser.username, ...body };

  const theNewComment = new Comment(commentDocument);
  Logger.debug('Acknowledged: ', commentDocument);

  try {
    const commentInCollection = await theNewComment.save();
    Logger.debug('Comment posted successfully.');
    return res
      .status(200)
      .json({ message: 'Comment posted successfully', data: commentInCollection });
  } catch (err) {
    Logger.debug(err);
    return res.json({ message: 'Could not post your comment' });
  }
};

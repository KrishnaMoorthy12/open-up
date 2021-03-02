import chalk from 'chalk';
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

  let theNewComment = new Comment(commentDocument);
  Logger.debug('Acknowledged: ', commentDocument);

  try {
    theNewComment = await theNewComment.save();
    Logger.debug('Comment posted successfully.');
    return res.status(200).json({ message: 'Comment posted successfully', data: theNewComment });
  } catch (err) {
    Logger.debug(err);
    return res.json({ message: 'Could not post your comment' });
  }
};

/*
 * Get Comments of a post [depth 0]
 *
 * @route: /api/post/:id/comments
 * @method: GET
 *
 */
export const getCommentsOfAPost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId, depth: 0 });
    return res.status(200).json({ message: `${comments.length} comments found`, data: comments });
  } catch (err) {
    Logger.error(chalk.red('Error: '), err);
  }
};

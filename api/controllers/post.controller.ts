import { Request, Response } from 'express';
import Logger from 'js-logger';

import { Post } from '../models';

/*
 * New Post
 *
 * @route: /api/post/new
 * @method: POST
 * requires: body { author, is_anonymous?, title, body, views?, upvotes?, downvotes?, tags? }
 * response: 'Post created successfully' | 'Could not create your post'
 */

export const newPost = async (req: Request, res: Response) => {
  const { loggedInUser, ...body } = req.body;
  const postDocument = { author: loggedInUser.username, ...body };

  // TODO: auto tag finder

  const theNewPost = new Post(postDocument);
  Logger.debug('Acknowledged: ', postDocument);

  try {
    const postInCollection = await theNewPost.save();
    Logger.debug('New post created successfully.');
    return res.status(200).json({ message: 'Post created successfully', data: postInCollection });
  } catch (err) {
    Logger.debug(err);
    return res.status(500).json({ message: 'Could not create your post' });
  }
};

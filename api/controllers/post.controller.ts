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

  let theNewPost = new Post(postDocument);
  Logger.debug('Acknowledged: ', postDocument);

  try {
    theNewPost = await theNewPost.save();
    Logger.debug('New post created successfully.');
    return res.status(200).json({ message: 'Post created successfully', data: theNewPost });
  } catch (err) {
    Logger.debug(err);
    return res.status(500).json({ message: 'Could not create your post' });
  }
};

/*
 * Get Post
 *
 * @route: /api/post/:id
 * @method: GET
 *
 */

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { loggedInUser } = req.body;

  try {
    const thePost = await Post.findById(id);
    if (!thePost) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    return res.status(200).json({
      data: {
        ...thePost._doc,
        author:
          thePost.is_anonymous && loggedInUser.username !== thePost.author
            ? 'Anonymous'
            : thePost.author
      }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error getting the post' });
  }
};

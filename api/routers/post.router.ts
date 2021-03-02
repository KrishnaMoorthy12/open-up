import { Router } from 'express';

import { newPost, getPost } from '../controllers/post.controller';
import { getCommentsOfAPost, newComment } from '../controllers/comment.controller';
import { authenticatedOnly } from '../middlewares/auth.middleware';

/*
 * Controls routes /api/post
 */

const router = Router();

router.post('/new', authenticatedOnly, newPost);
router.get('/:id', authenticatedOnly, getPost);
router.get('/:id/comments', authenticatedOnly, getCommentsOfAPost);
router.post('/comment', authenticatedOnly, newComment);

export default router;

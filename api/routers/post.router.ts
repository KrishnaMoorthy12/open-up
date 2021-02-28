import { Router } from 'express';

import { newPost } from '../controllers/post.controller';
import { newComment } from '../controllers/comment.controller';
import { authenticatedOnly } from '../middlewares/auth.middleware';

/*
 * Controls routes /api/post
 */

const router = Router();

router.post('/new', authenticatedOnly, newPost);
router.post('/comment', authenticatedOnly, newComment);

export default router;

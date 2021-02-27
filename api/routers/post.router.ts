import { Router } from 'express';

import { newPost } from '../controllers/post.controller';
import { authenticatedOnly } from '../middlewares/auth.middleware';

/*
 * Controls routes /api/post
 */

const router = Router();

router.post('/new', authenticatedOnly, newPost);

export default router;

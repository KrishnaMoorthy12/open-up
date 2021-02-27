import { Router } from 'express';

import { newUser, updateUser } from '../controllers/user.controller';
import { authenticatedOnly } from '../middlewares/auth.middleware';

/*
 * Controls routes /api/user
 */

const router = Router();

router.post('/new', newUser);
router.post('/update', authenticatedOnly, updateUser);

export default router;

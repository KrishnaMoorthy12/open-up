import express from 'express';

import { newUser, updateUser } from '../controllers/user.controller';
import { authenticatedOnly } from '../middlewares/auth.middleware';

/*
 * Controls routes /api/user
 */

const router = express.Router();

router.post('/new', newUser);
router.post('/update', authenticatedOnly, updateUser);

export default router;

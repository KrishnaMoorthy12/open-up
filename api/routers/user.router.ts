import express from 'express';

import { newUser, updateUser } from '../controllers/user.controller';

/*
 * Controls routes /api/user
 */

const router = express.Router();

router.post('/new', newUser);
router.post('/update', updateUser);

export default router;

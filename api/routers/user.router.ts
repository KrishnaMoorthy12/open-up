import express from 'express';

import { newUser } from '../controllers/user.controller';

/*
 * Controls routes /api/user
 */

const router = express.Router();

router.post('/new', newUser);

export default router;

import express from 'express';

import { newUser } from '../controllers/user.controller';

/*
 * Controls routes /api/user
 */

const router = express.Router();

router.get('/:id', newUser);

export default router;

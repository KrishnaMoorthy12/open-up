import express from 'express';

import { login } from '../controllers/auth.controller';

/*
 * Controls routes /api/auth
 */

const router = express.Router();

router.post('/login', login);

export default router;

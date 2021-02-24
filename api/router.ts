import express from 'express';

import { AuthRouter, UserRouter } from './routers';

/*
 * Controls routes /api
 */

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);

export default router;

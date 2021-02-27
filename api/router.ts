import express from 'express';

import { AuthRouter, PostRouter, UserRouter } from './routers';

/*
 * Controls routes /api
 */

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/post', PostRouter);
router.use('/user', UserRouter);

export default router;

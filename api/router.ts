import express from 'express';

import { UserRouter } from './routers';

/*
 * Controls routes /api
 */

const router = express.Router();

router.use('/user', UserRouter);

export default router;

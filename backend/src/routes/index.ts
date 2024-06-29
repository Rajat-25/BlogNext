import { Router } from 'express';
import blogRouter from './blogRoute';
import userRouter from './userRoute';

const router = Router();

router.use('/blogs', blogRouter);
router.use('/user', userRouter);

export default router;

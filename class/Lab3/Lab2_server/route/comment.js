import express from 'express';
import { commentController } from '../controllers/index.js';

// Khai báo đối tượng router
const commentRouter = express.Router();

commentRouter.post('/:id', commentController.createComment);

export default commentRouter;
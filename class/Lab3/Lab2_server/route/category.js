import express from 'express';
import { categoryController } from '../controllers/index.js';

// Khai báo đối tượng router
const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getAllCategories);

export default categoryRouter;
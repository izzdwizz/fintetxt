import express from 'express';
import imageController from '../controllers/imageController.js';

const router = express.Router();

router.get('/images', imageController.getAllImages);
router.get('/images/:id', imageController.getImage);

export default router; // Use export default for ES6 module
import express from 'express';
import fileController from '../controllers/fileController.js'; // Add .js extension

const router = express.Router();

router.post('/upload', fileController.uploadFile);

export default router; // Use export default for ES6 module
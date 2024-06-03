import express from 'express';
import userController from '../controllers/userController.js';
// import validateSession from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Welcome to Kryptonian App BACKEND API');
});

router.post('/register', userController.register);
router.get('/confirm-email', userController.confirmEmail);
router.post('/login', userController.login);
router.post('/verify-otp', userController.verifyOTP);
// router.get('/logout', userController.logout); 
router.post('/api-key/create', userController.createApiKey);
router.post('/api-key/invalidate', userController.invalidateApiKey);

export default router;
import express from 'express';
import protect from '../middlewares/protectRoute.js';
import {
  getMyProfile,
  updateProfile,
  changePassword,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/me', protect, getMyProfile);

router.put('/me', protect, updateProfile);

router.put('/me/password', protect, changePassword);

export default router;

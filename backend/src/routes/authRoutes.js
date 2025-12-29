import express from 'express';
import {
  check,
  logout,
  signIn,
  signUp,
} from '../controllers/authController.js';
import protect from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/signup', signUp);

router.post('/signin', signIn);

router.get('/check', protect, check);

router.post('/signout', logout);

export default router;

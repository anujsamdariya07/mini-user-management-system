import express from 'express';
import protect from '../middlewares/protectRoute.js';
import adminOnly from '../middlewares/adminOnly.js';
import {
  getAllUsers,
  activateUser,
  deactivateUser,
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/users/:page', protect, adminOnly, getAllUsers);

router.patch('/users/:id/activate', protect, adminOnly, activateUser);

router.patch('/users/:id/deactivate', protect, adminOnly, deactivateUser);

export default router;

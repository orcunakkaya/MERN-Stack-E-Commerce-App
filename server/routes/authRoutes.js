import express from 'express';
const router = express.Router();
import validateToken from '../middleware/authMiddleware.js';

import { createUser, getUser, getProfile, isUserAuth } from '../controllers/authController.js';


router.post("/signup", createUser);
router.post("/signin", getUser);
router.post("/profile", validateToken, getProfile);
router.get("/isUserAuth", isUserAuth);

export default router;
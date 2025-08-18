import { Router } from 'express';
import { loginController } from '../controllers/auth.controller.js';
import { requireLoginBody } from '../middleware/require-login-body.js';

export const authRouter = Router();

authRouter.post('/login', requireLoginBody, loginController);

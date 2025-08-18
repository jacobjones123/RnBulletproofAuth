import { Request, Response, NextFunction } from 'express';
import { verifyUser } from '../models/user.js';

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const ok = await verifyUser(email, password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = 'fake-jwt-token';
    return res.json({
      token,
      user: { id: 'u_1', email }
    });
  } catch (err) {
    next(err as any);
  }
}

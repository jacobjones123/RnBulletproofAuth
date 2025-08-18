import { Request, Response, NextFunction } from 'express';

export function requireLoginBody(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  next();
}

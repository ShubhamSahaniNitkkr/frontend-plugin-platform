import { loginSchema } from '@fpp/shared';
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import * as authService from '../services/auth.service.js';

export const authRouter = Router();

authRouter.post('/login', validateBody(loginSchema), (req, res) => {
  const result = authService.login(req.body.email, req.body.password);
  if (!result) {
    res.status(401).json({
      title: 'Unauthorized',
      status: 401,
      detail: 'Invalid email or password',
    });
    return;
  }
  res.json({ data: result });
});

authRouter.get('/me', authMiddleware, (req, res) => {
  const user = authService.getMe(req.user!.id);
  if (!user) {
    res.status(404).json({ title: 'Not Found', status: 404 });
    return;
  }
  res.json({ data: user });
});

authRouter.post('/logout', authMiddleware, (_req, res) => {
  res.json({ data: { success: true } });
});

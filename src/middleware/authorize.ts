// src/middlewares/authorize.ts
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authenticate';

export const authorize =
  (requiredRole: 'ADMIN' | 'USER') =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Acesso não autorizado' });
    }
    next();
  };

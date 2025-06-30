// src/routes/user.routes.ts
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();

router.put('/users/:id', authenticate, updateUser);
router.delete('/users/:id', authenticate, deleteUser);

export default router;

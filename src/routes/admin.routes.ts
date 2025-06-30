import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';
import { listUsers } from '../controllers/admin.controller';
import { listInactiveUsers } from '../controllers/admin.controller';
import { listInactiveUsersByLogin } from '../controllers/admin.controller';

const router = Router();

router.get('/admin/users', authenticate, authorize('ADMIN'), listUsers);
router.patch('/admin/users/:id/promote', authenticate, authorize('ADMIN'));
router.get('/admin/users/inactive', authenticate, authorize('ADMIN'), listInactiveUsers);
router.get('/admin/users/inactive-login', authenticate, authorize('ADMIN'), listInactiveUsersByLogin);

export default router;

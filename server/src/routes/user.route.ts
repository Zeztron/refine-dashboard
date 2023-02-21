import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserInfoById,
} from '../controllers/user.controller';

const router = Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserInfoById);

export default router;

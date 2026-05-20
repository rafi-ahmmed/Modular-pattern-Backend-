import { Router } from 'express';
import { profileController } from './profile.controller.js';
import { USER_ROLE } from '../../types/index.js';
import auth from '../../middleware/auth.js';

const router = Router();

router.post('/', profileController.createProfile);
router.get('/', auth(USER_ROLE.admin), profileController.getAllProfiles);
router.get('/:id', profileController.getProfile);
router.put('/:id', profileController.updateProfile);

export const profileRouter = router;

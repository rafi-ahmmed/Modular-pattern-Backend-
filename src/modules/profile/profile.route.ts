import { Router } from 'express';
import { profileController } from './profile.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../types';

const router = Router();

router.post('/', profileController.createProfile);
router.get('/', auth(USER_ROLE.admin), profileController.getAllProfiles);
router.get('/:id', profileController.getProfile);
router.put('/:id', profileController.updateProfile);

export const profileRouter = router;

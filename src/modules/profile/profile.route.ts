import { Router } from 'express';
import { profileController } from './profile.controller';

const router = Router();

router.post('/', profileController.createProfile);
router.get('/', profileController.getAllProfiles);
router.get('/:id', profileController.getProfile);
router.put('/:id', profileController.updateProfile);

export const profileRouter = router;

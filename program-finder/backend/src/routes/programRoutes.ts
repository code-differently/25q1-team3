import { Router } from 'express';
import { ProgramController } from '../controllers/ProgramController';

const router = Router();

router.get('/programs', (req, res, next) => ProgramController.searchPrograms(req, res, next));
router.get('/programs/:id', (req, res, next) => ProgramController.getById(req, res, next));

export default router;

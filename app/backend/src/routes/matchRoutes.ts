import { Router } from 'express';
import MatchController from '../controllers/matchcontroller';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAll);

export default router;

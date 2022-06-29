import { Router } from 'express';
import MatchController from '../controllers/matchcontroller';
import MatchMiddleware from '../middlewares/matchMiddleware';

const matchRoutes = Router();

const matchController = new MatchController();

matchRoutes.get('/', matchController.getInProgress);

matchRoutes.post('/', MatchMiddleware.validateTeams, matchController.createNewMatch);

matchRoutes.patch('/:id/finish', matchController.updateProgressMatch);

matchRoutes.patch('/:id', matchController.editMatch);

export default matchRoutes;

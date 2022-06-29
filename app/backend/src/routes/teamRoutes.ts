import { Router } from 'express';
import TeamsController from '../controllers/teamController';

const teamRoutes = Router();
const teamsController = new TeamsController();

teamRoutes.get('/', teamsController.getAll);

teamRoutes.get('/:id', teamsController.getById);

export default teamRoutes;

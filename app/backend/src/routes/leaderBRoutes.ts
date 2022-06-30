import { Router } from 'express';
import LeaderboardController from '../controllers/leaderBController';

const leaderBRoutes = Router();
const controller = new LeaderboardController();

leaderBRoutes.get('/home', controller.createHomeLeaderB);

leaderBRoutes.get('/away', controller.createAwayLeaderB);

leaderBRoutes.get('/', controller.createLeaderboard);

export default leaderBRoutes;

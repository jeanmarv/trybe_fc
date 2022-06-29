import { Router } from 'express';
import LoginController from '../controllers/loginController';
import LoginMiddleware from '../middlewares/loginMiddleware';

const loginRoutes = Router();

const loginController = new LoginController();

loginRoutes.post(
  '/',
  LoginMiddleware.validateEmail,
  LoginMiddleware.validatePassword,
  loginController.user,
);

loginRoutes.get('/validate', loginController.validateUser);

export default loginRoutes;

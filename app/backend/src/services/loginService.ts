import { compare } from 'bcryptjs';
import Token from '../externals/tokenHandler';
import User from '../database/models/user';

class LoginService {
  private token: Token;

  constructor() {
    this.token = new Token();
  }

  private getUser = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { statusCode: 401, result: { message: 'Incorrect email or password' } };
    }
    return user;
  };

  private validateLogin = (password: string, email: string) => {
    if (!password || !email) {
      return { statusCode: 400, result: { message: 'All fields must be filled' } };
    }
  };

  private validatePassword = async (password: string, userPass: string) => {
    const validatedPass = await compare(password, userPass);
    if (!validatedPass) {
      return { statusCode: 401, result: { message: 'Incorrect email or password' } };
    }
  };

  login = async (password: string, email: string) => {
    const validateLogin = this.validateLogin(password, email);
    if (validateLogin) {
      return validateLogin;
    }

    const getUser = await this.getUser(email);

    await this.validatePassword(password, getUser.password);

    return {
      statusCode: 200,
      result: {
        user: {
          id: getUser.id,
          username: getUser.username,
          role: getUser.role,
          email,
        },
        token: this.token.generateToken(getUser.role),
      },
    };
  };

  loginValidate = async (authorization: string) => {
    const role = this.token.verifyToken(authorization);
    return role;
  };
}

export default LoginService;

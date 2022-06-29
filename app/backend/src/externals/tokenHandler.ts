import { readFileSync } from 'fs';
import { sign, verify } from 'jsonwebtoken';

const secret = readFileSync('jwt.evaluation.key');

class Token {
  generateToken = (received: string) => {
    const token = sign({ received }, secret, { expiresIn: '8h' });
    return token;
  };

  verifyToken = (authorization: string) => {
    const verifying = verify(authorization, secret);
    const findToken = Object.values(verifying);
    const foundToken = findToken.find((tok) => (typeof tok) === 'string');
    return foundToken;
  };
}

export default Token;

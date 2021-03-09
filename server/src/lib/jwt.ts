import { sign } from 'jsonwebtoken';
import { JWTSecret } from 'config';

export { decode } from 'jsonwebtoken';

// eslint-disable-next-line
export const signJWT = (payload: string | Buffer | object) =>
  sign(payload, JWTSecret);

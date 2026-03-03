import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: Secret,
  expiresIn: number | string,
): string => {
  const options: SignOptions = { expiresIn } as SignOptions;
  return jwt.sign(jwtPayload, secret, options);
};

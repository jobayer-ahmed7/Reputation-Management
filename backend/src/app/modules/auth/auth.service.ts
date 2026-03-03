
import bcrypt from 'bcrypt';
import { ILoginUser } from './auth.interface';
import { User } from '../user/user.model';
import config from '../../config';
import { createToken } from './auth.utils';

// login a user
const login = async (payload: ILoginUser) => {
  const user = await User.findOne({
    email: payload.email,
  }).select('+password');

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const userStatus = user.status;
  if (userStatus === 'inactive') {
    throw new Error('Invalid credentials');
  }

  const userPassword = user.password;
  const isPasswordMatch = await bcrypt.compare(payload.password, userPassword);

  if (!isPasswordMatch) {
    throw new Error('Invalid credentials');
  }
  if (!config.jwt_access_secret) {
    throw new Error('JWT secret is not defined');
  }

  const token = createToken(
    { email: user.email, role: user?.role },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    { email: user.email, role: user?.role },
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  const { password: _, ...verifiedUser } = user.toObject();

  const result = {
    token,
    refreshToken,
    user: verifiedUser,
  };



  return result;
}; 

export const authService = {
  login,
};

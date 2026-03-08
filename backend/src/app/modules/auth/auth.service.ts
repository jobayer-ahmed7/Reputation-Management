import bcrypt from 'bcrypt';
import { ILoginUser } from './auth.interface';
import { User } from '../user/user.model';
import config from '../../config';
import { createToken } from './auth.utils';
import { TUser } from '../user/user.interface';
import nodemailer from 'nodemailer';

const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.gmail_user as string,
      pass: config.gmail_app_password as string,
    },
  });

  await transporter.verify();
  // console.log("SMTP connection verified ✅");

  await transporter.sendMail({
    from: `"Reputation Manage" <${config.gmail_user}>`,
    to: email,
    subject: 'Your OTP Code for Email Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto;">
        <h2>Email Verification for Reputation Manage</h2>
        <p>Use the OTP below to verify your account. It expires in <strong>10 minutes</strong>.</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #4F46E5; padding: 16px 0;">
          ${otp}
        </div>
        <p style="color: #888; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
};

// register a user
const register = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });

  // console.log("dfdf")

  // If a verified user already exists, block registration
  if (existingUser && existingUser.isVerified) {
    throw new Error('Email is already registered.');
  }
  // If an unverified user exists (e.g. previous failed attempt), delete and recreate
  if (existingUser && !existingUser.isVerified) {
    await User.deleteOne({ email: payload.email });
  }

  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Save user as unverified
  await User.create({
    ...payload,
    otp,
    otpExpiry,
    isVerified: false,
  });
  // console.log(payload);

  // Try sending OTP — if it fails, delete the user and throw
  try {
    await sendOtpEmail(payload.email, otp);
  } catch {
    await User.deleteOne({ email: payload.email });
    throw new Error('Failed to send OTP email. Please try again.');
  }

  return { message: 'OTP sent successfully. Please check your email.' };

  // const result = await User.create(payload);
  // return result;
};

// verify OTP and activate user
const verifyOtp = async (email: string, otp: string) => {
  const user = await User.findOne({ email }).select('+otp +otpExpiry');

  if (!user) {
    throw new Error('User not found.');
  }

  // OTP expired → delete the unverified user
  if (!user.otpExpiry || user.otpExpiry < new Date()) {
    await User.deleteOne({ email });
    throw new Error('OTP has expired. Please register again.');
  }

  // Wrong OTP → delete the unverified user
  if (user.otp !== otp) {
    await User.deleteOne({ email });
    throw new Error('Invalid OTP. Please register again.');
  }

  // OTP is correct → mark user as verified and clear OTP fields
  await User.findByIdAndUpdate(user._id, {
    isVerified: true,
    otp: null,
    otpExpiry: null,
  });

  return { message: 'Email verified successfully. You can now log in.' };
};

// login a user
const login = async (payload: ILoginUser) => {
  const user = await User.findOne({
    email: payload.email,
  }).select('+password');

  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.isVerified) {
    throw new Error('Please verify your email before logging in.');
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
  register,
  verifyOtp,
  login,
};

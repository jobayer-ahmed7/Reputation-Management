/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import type { USER_ROLE } from "./user.constant.js";

export interface TUser {
  name: string;
  email: string;
  password: string;
  needsPasswordChange: boolean; 
  passwordChangedAt?: Date;
  role: "admin" | "customer";
  status: "active" | "inactive";
  image?: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

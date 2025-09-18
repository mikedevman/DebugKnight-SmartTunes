import * as SongModel from '../models/songModel';
import * as AlbumModel from '../models/albumModel';
import * as JunctionModel from '../models/junctionModel';
import * as UserModel from '../models/userModel';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from '../utils/prisma';
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Environment variable validation

export const envSchema = z.object({
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().regex(/^\d+[smhd]$/, "JWT_EXPIRES_IN must be like '15m', '1h', '7d'"),
  SALT_ROUNDS: z.string().optional(),
});

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});


const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables:");
  process.exit(1);
}

const JWT_SECRET = _env.data.JWT_SECRET as string;
const SALT_ROUNDS = _env.data.SALT_ROUNDS;
const JWT_EXPIRES_IN = (_env.data.JWT_EXPIRES_IN || "15m") as jwt.SignOptions["expiresIn"];


const salt_rounds = SALT_ROUNDS ? parseInt(SALT_ROUNDS) : 10;


//getProfile(userId), refreshToken(), logout(), updatePassword(userId, oldPassword, newPassword), deleteUser(userId)

export const registerService = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, salt_rounds);
    const existingUser = await UserModel.findUserByUsername(username);
    if (existingUser) {
      throw new Error("User already exists");
    }
    await UserModel.createUser({
      username,
      password_hash: hashedPassword,
    });

    return { message: "User registered successfully" };
};

export const loginService = async (username: string, password: string) => {
  const parsed = loginSchema.safeParse({ username, password });
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const user = await UserModel.findUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }

  // 2. Compare entered password with stored hashedPassword
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // 3. Generate Access Token (JWT)
  const accessToken = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN || "15m" } // default 15 minutes
  );

  // 4. Generate Refresh Token (longer life)
  const refreshToken = jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { expiresIn: "7d" } // one week
  );

  const token = await UserModel.updateUser(user.id, { token: refreshToken });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, username: user.username }, // return safe info only
  };
};

export const findUserByUsernameService = async (username: string) => {
    const user = await UserModel.findUserByUsername(username);
    if (!user) {
      throw new Error("User do not exist");
    }
    return { username: user.username, playlists_created: user.playlists_created, id: user.id };
};

export const logoutService = async (userId: number) => {
  const user = await UserModel.findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  await UserModel.updateUser(userId, { token: null });
  return { message: "Logged out successfully" };
};


export const deleteUserService = async (username: string) => {
    const user = await UserModel.findUserByUsername(username);
    if (!user) {
      throw new Error("User do not exist");
    }
    await UserModel.deleteUser(user.id);
    return { message: "User deleted successfully" };
};

export const updatePasswordService = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {
  const user = await UserModel.findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // 1. Check old password
  const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password_hash);
  if (!isOldPasswordValid) {
    throw new Error("Old password is incorrect");
  }

  // 2. Hash new password
  const hashedNewPassword = await bcrypt.hash(newPassword, salt_rounds);

  // 3. Update in DB
  await UserModel.updateUser(userId, { password_hash: hashedNewPassword });

  // (optional) Invalidate all sessions so old tokens stop working
  await UserModel.updateUser(userId, { token: null });
  return { message: "Password updated successfully" };
};

export const refreshTokenService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Refresh token required");
  }

  // 1. Verify the refresh token signature & expiration
  let decoded: any;
  try {
    decoded = jwt.verify(refreshToken, JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }

  // 2. Find the user and validate stored refresh token
  const user = await UserModel.findUserById(decoded.userId);
  if (!user || user.token !== refreshToken) {
    throw new Error("Refresh token not recognized");
  }

  // 3. Generate a new short-lived access token
  const newAccessToken = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN || "15m" }
  );

  // (optional) Rotate the refresh token for extra security
  const newRefreshToken = jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Save rotated refresh token in DB
  await UserModel.updateUser(user.id, { token: newRefreshToken });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken, // return new one if rotating
  };
};


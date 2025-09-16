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

  // (optional) store refresh token in DB if you want to track/revoke
  // await prisma.refreshToken.create({
  //   data: { token: refreshToken, userId: user.id },
  // });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, username: user.username }, // return safe info only
  };
};
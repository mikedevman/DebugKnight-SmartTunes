import { Request, Response } from "express";
import * as UserService from "../services/userService";
import { z } from "zod";

// Schemas for validation

const credentials = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

const updatePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

// --------------------- Controller Functions ---------------------

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const parsed = credentials.parse(req.body);
    const result = await UserService.registerService(parsed.username, parsed.password);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const parsed = credentials.parse(req.body);
    const result = await UserService.loginService(parsed.username, parsed.password);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

// Get user profile by ID
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId); // assume userId comes from params
    const profile = await UserService.findUserByUsernameService(String(userId)); // could use a findUserByIdService if added
    res.status(200).json(profile);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

// Logout user
export const logout = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserService.logoutService(userId);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => { //only available in the user account menu
  try {
    const username = String(req.params.username);
    const result = await UserService.deleteUserService(username);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

// Update password
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const parsed = updatePasswordSchema.parse(req.body);
    const result = await UserService.updatePasswordService(
      userId,
      parsed.oldPassword,
      parsed.newPassword
    );
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Refresh access token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const result = await UserService.refreshTokenService(refreshToken);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

import { Request, Response } from "express";
import { z } from "zod";
import * as PlaylistService from "../services/playlistService";

const createPlaylistSchema = z.object({
  playlist_name: z.string().min(1),
  description: z.string().optional(),
});


// Create playlist
export const createPlaylist = async (req: Request, res: Response) => {
  try {
    // Validate request body
    createPlaylistSchema.parse(req.body);
    const userId = Number(req.params.userId); // assume userId comes from route params
    const data = req.body; // expected to match Prisma.playlistCreateInput
    const playlist = await PlaylistService.createPlaylistService(userId, data);
    res.status(201).json(playlist);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

//  Get all playlists of a user
export const getUserPlaylists = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const playlists = await PlaylistService.displayAllPlaylistOfUserService(userId);
    res.status(200).json(playlists);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

// Add song to a playlist
export const addSongToPlaylist = async (req: Request, res: Response) => {
  try {
    const { playlistId, songId } = req.body;
    const updatedPlaylist = await PlaylistService.addSongToPlaylistService(playlistId, songId);
    res.status(200).json(updatedPlaylist);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Delete playlist
export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const playlistId = Number(req.params.playlistId);
    const userId = Number(req.params.userId); // assume passed in URL
    const deleted = await PlaylistService.deletePlaylistService(playlistId, userId);
    res.status(200).json(deleted);
  } catch (err: any) {
    res.status(403).json({ error: err.message });
  }
};

// Search playlists by name (case-insensitive)
export const searchPlaylists = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { name } = req.query;
    const playlists = await PlaylistService.findPlaylistsByNameForUserService(userId, String(name));
    res.status(200).json(playlists);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Search songs across playlists
export const searchSongsInPlaylist = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const songs = await PlaylistService.findSongsInPlaylistService(String(name));
    res.status(200).json(songs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

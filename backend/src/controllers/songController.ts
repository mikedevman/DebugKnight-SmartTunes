import { Request, Response } from "express";
import { z } from "zod";
import * as SongService from "../services/songService";

const createSongSchema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
  key: z.string().min(1).optional(),
  tempo: z.string().min(1).optional(),
  genre: z.string().min(1).optional(),
  year_publish: z.number().min(1900).max(new Date().getFullYear()).optional(),
  album: z.number().min(1).optional(), // only allow raw FK id
});

const updateSongSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  key: z.string().optional(),
  tempo: z.string().optional(),
  genre: z.string().optional(),
  year_publish: z.number().min(1900).max(new Date().getFullYear()).optional(),
  album: z.number().min(1).optional(), // only allow raw FK id
});

// Get one song by ID
export const getUniqueSong = async (req: Request, res: Response) => {
  try {
    const songId = Number(req.params.songId);
    const song = await SongService.getUniqueSongService(songId);
    res.status(200).json(song);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

//  Get all songs by author
export const getSongsByAuthor = async (req: Request, res: Response) => {
  try {
    const authorId = Number(req.params.authorId);
    const songs = await SongService.getSongsByAuthor(authorId);
    res.status(200).json(songs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get all songs sorted
export const getAllSongsSorted = async (req: Request, res: Response) => {
  try {
    const { sortField, sortOrder } = req.query;
    const songs = await SongService.getAllSongsSortedService(
      sortField as any,
      (sortOrder as "asc" | "desc") || "asc"
    );
    res.status(200).json(songs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Update a song’s album
export const updateSongAlbum = async (req: Request, res: Response) => {
  try {
    const { songId, albumId } = req.body;
    const updated = await SongService.updateSongAlbumService(Number(songId), Number(albumId));
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a song
export const deleteSong = async (req: Request, res: Response) => {
  try {
    const { songId, playlistId } = req.body;
    await SongService.deleteSongService(Number(songId));
    res.status(204).send(); // No content after successful deletion
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Search songs by name
export const findSongsByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: "Missing 'name' query parameter" });
    }
    const songs = await SongService.findSongsByNameService(String(name));
    res.status(200).json(songs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Update song details
export const updateSongDetail = async (req: Request, res: Response) => {
  try {
    // Validate request body
    updateSongSchema.parse(req.body.data);
    const { songId, data } = req.body;
    const updated = await SongService.updateSongDetailService(Number(songId), data);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Increment time played
export const updateSongTimePlayed = async (req: Request, res: Response) => {
  try {
    const songId = Number(req.params.songId);
    const updated = await SongService.updateSongTimePlayedService(songId);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Increment view
export const updateSongView = async (req: Request, res: Response) => {
  try {
    const songId = Number(req.params.songId);
    const updated = await SongService.updateSongViewService(songId);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Create a new song
export const createSong = async (req: Request, res: Response) => {
  try {
    // Validate request body
    createSongSchema.parse(req.body);
    const data = req.body; // expected to match Prisma.songCreateInput
    const created = await SongService.createSongService(data);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
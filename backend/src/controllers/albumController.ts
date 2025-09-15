import { Request, Response } from "express";
import { z } from "zod";
import * as AlbumService from "../services/albumService";

const createAlbumSchema = z.object({
  album_name: z.string(),
});

// Create a new album
export const createAlbum = async (req: Request, res: Response) => {
  try {
    // Validate request body
    createAlbumSchema.parse(req.body);
    const userId = Number(req.params.userId); // assume userId comes from route params
    const data = req.body; // should validate with Zod before using
    
    const album = await AlbumService.createAlbumService(data, userId);
    res.status(201).json(album);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get sorted songs inside an album
export const getSortedSongsInAlbum = async (req: Request, res: Response) => {
  try {
    const albumId = Number(req.params.albumId);
    const { sortField, sortOrder } = req.query;

    const songs = await AlbumService.getSortedSongInAlbumService(
      albumId,
      sortField as any, // Prisma.SongScalarFieldEnum
      (sortOrder as "asc" | "desc") || "asc"
    );

    res.status(200).json(songs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a song from an album (only if user is author)
export const deleteSongFromAlbum = async (req: Request, res: Response) => {
  try {
    const { songId, albumId, userId } = req.params;

    const song = await AlbumService.deleteSongFromAlbumService(
      Number(songId),
      Number(albumId),
      Number(userId)
    );

    res.status(200).json({ message: "Song removed from album", song });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an entire album (only if user is author)
export const deleteAlbum = async (req: Request, res: Response) => {
  try {
    const { albumId, userId } = req.params;

    const album = await AlbumService.deleteAlbumService(
      Number(albumId),
      Number(userId)
    );

    res.status(200).json({ message: "Album deleted", album });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Search albums by name (case-insensitive, raw SQL)
export const findAlbumsByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    const albums = await AlbumService.findAlbumsByNameService(String(name));
    res.status(200).json(albums);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Search songs by name inside albums (case-insensitive, raw SQL)
export const findSongsByNameInAlbum = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    const songs = await AlbumService.findSongsByNameInAlbumService(String(name));
    res.status(200).json(songs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

import { Router } from "express";
import * as PlaylistController from "../controllers/playlistController";

const router = Router();

// Create a new playlist for a user
router.post("/create/:userId", PlaylistController.createPlaylist);

// Get all playlists for a specific user
router.get("/user/:userId", PlaylistController.getUserPlaylists);

// Add a song to a playlist
router.post("/add-song", PlaylistController.addSongToPlaylist);

// Delete a playlist
router.delete("/:playlistId/:userId", PlaylistController.deletePlaylist);

// Search playlists by name (case-insensitive)
router.get("/search/:userId", PlaylistController.searchPlaylists);

// Search songs across playlists
router.get("/search/songs", PlaylistController.searchSongsInPlaylist);

export default router;

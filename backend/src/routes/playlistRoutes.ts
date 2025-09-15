import { Router } from "express";
import * as PlaylistController from "../controllers/playlistController";

const router = Router();

// Create a new playlist for a user
// POST /playlists/create/:userId
router.post("/create/:userId", PlaylistController.createPlaylist);

// Get all playlists for a specific user
// GET /playlists/user/:userId
router.get("/user/:userId", PlaylistController.getUserPlaylists);

// Add a song to a playlist
// POST /playlists/add-song
router.post("/add-song", PlaylistController.addSongToPlaylist);

// Delete a playlist
// DELETE /playlists/:playlistId/:userId
router.delete("/:playlistId/:userId", PlaylistController.deletePlaylist);

// Search playlists by name (case-insensitive)
// GET /playlists/search/:userId?name=rock
router.get("/search/:userId", PlaylistController.searchPlaylists);

// Search songs across playlists
// GET /playlists/search/songs?name=love
router.get("/search/songs", PlaylistController.searchSongsInPlaylist);

export default router;

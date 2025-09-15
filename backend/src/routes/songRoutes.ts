import { Router } from "express";
import * as SongController from "../controllers/songController";

const router = Router();

// Create a new song
// POST /songs
router.post("/", SongController.createSong);

// Get one song by ID
// GET /songs/:songId
router.get("/:songId", SongController.getUniqueSong);

// Get all songs by author
// GET /songs/author/:authorId
router.get("/author/:authorId", SongController.getSongsByAuthor);

// Get all songs sorted
// GET /songs?sortField=name&sortOrder=asc
router.get("/", SongController.getAllSongsSorted);

// Update a song’s album
// PUT /songs/album
router.put("/album", SongController.updateSongAlbum);

// Delete a song
// DELETE /songs
router.delete("/", SongController.deleteSong);

// Search songs by name
// GET /songs/search?name=love
router.get("/search", SongController.findSongsByName);

// Update song details
// PUT /songs
router.put("/", SongController.updateSongDetail);

// Increment time played
// PATCH /songs/:songId/time-played
router.patch("/:songId/time-played", SongController.updateSongTimePlayed);

// Increment view
// PATCH /songs/:songId/view
router.patch("/:songId/view", SongController.updateSongView);

export default router;
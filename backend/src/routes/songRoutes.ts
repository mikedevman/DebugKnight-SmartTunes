import { Router } from "express";
import * as SongController from "../controllers/songController";

const router = Router();

// Create a new song
router.post("/", SongController.createSong);

// Get one song by ID
router.get("/:songId", SongController.getUniqueSong);

// Get all songs by author
router.get("/author/:authorId", SongController.getSongsByAuthor);

// Get all songs sorted
router.get("/", SongController.getAllSongsSorted);

// Update a song’s album
router.put("/album", SongController.updateSongAlbum);

// Delete a song
router.delete("/", SongController.deleteSong);

// Search songs by name
router.get("/search", SongController.findSongsByName);

// Update song details
router.put("/", SongController.updateSongDetail);

// Increment time played
router.patch("/:songId/time-played", SongController.updateSongTimePlayed);

// Increment view count
router.patch("/:songId/view", SongController.updateSongView);

export default router;
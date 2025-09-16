import { Router } from "express";
import * as SongController from "../controllers/songController";

const router = Router();


// Get all songs by author
router.get("/author/:authorId", SongController.getSongsByAuthor);

// Increment time played
router.patch("/:songId/time-played", SongController.updateSongTimePlayed);

// Increment view count
router.patch("/:songId/view", SongController.updateSongView);

// Update a song’s album
router.put("/album", SongController.updateSongAlbum);

// Search songs by name
router.get("/search", SongController.findSongsByName);

// Get one song by ID
router.get("/:songId", SongController.getUniqueSong);

// Get all songs sorted
router.get("/", SongController.getAllSongsSorted);

// Update song details
router.put("/", SongController.updateSongDetail);

// Create a new song
router.post("/", SongController.createSong);

// Delete a song
router.delete("/", SongController.deleteSong);
export default router;
// routes/album.routes.ts
import { Router } from "express";
import * as AlbumController from "../controllers/albumController";

const router = Router();

// Create a new album for a user
router.post("/create/:userId", AlbumController.createAlbum);

// Get sorted songs inside an album
router.get("/songs/:albumId", AlbumController.getSortedSongsInAlbum);

// Delete a song from an album (requires userId for authorization)
router.delete("/songs/:albumId/:songId/:userId", AlbumController.deleteSongFromAlbum);

// Delete an entire album (requires userId for authorization)
router.delete("/:albumId/:userId", AlbumController.deleteAlbum);

// Search albums by name
router.get("/search", AlbumController.findAlbumsByName);

// Search songs by name inside albums
router.get("/search/songs", AlbumController.findSongsByNameInAlbum);

export default router;
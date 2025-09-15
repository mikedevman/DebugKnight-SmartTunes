import express from "express";
import * as PlaylistController from "./controllers/playlistController";
import * as AlbumController from "./controllers/albumController";
import * as SongController from "./controllers/songController";

const router = express.Router();

// Playlist routes
router.post("/playlists", PlaylistController.createPlaylist);
router.get("/playlists/:userId", PlaylistController.searchPlaylists);

export default router;

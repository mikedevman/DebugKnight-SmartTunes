import { Router } from "express";
import songRoutes from "./songRoutes";
import playlistRoutes from "./playlistRoutes";
import albumRoutes from "./albumRoutes";

const router = Router();

router.use("/songs", songRoutes);
router.use("/playlists", playlistRoutes);
router.use("/albums", albumRoutes);

export default router;

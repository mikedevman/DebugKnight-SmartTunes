import { Router } from "express";
import songRoutes from "./songRoutes";
import playlistRoutes from "./playlistRoutes";
import albumRoutes from "./albumRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/songs", songRoutes);
router.use("/playlists", playlistRoutes);
router.use("/albums", albumRoutes);
router.use("/users", userRoutes);

export default router;

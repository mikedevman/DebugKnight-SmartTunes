import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

// Middleware
app.use(cors()); //enable CORS for all origins. Change later for production
app.use(express.json());

// All API routes
app.use("/api", routes); //example of fetching: /api/songs, /api/playlists, /api/albums

export default app;

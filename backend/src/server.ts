import app from "./app";
import dotenv from "dotenv";
import { prisma } from "./utils/prisma";

dotenv.config();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await prisma.$connect(); // ensure DB is connected
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

startServer();


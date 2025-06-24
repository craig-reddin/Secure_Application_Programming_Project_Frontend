import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

// Check if we are running locally (not on Vercel)
const isLocal = process.env.VERCEL !== "1"; // Vercel sets VERCEL=1 in its environment

export default defineConfig({
  plugins: [react()],
  server: isLocal
    ? {
        https: {
          key: fs.readFileSync(process.env.VITE_SSL_KEY || "./privatekey.pem"),
          cert: fs.readFileSync(process.env.VITE_SSL_CERT || "./server.crt"),
        },
        port: 5173,
      }
    : undefined, // No custom server settings in Vercel
});

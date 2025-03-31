import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("./privatekey.pem"),
      cert: fs.readFileSync("./server.crt"),
    },
    port: 5173, // The default Vite port
  },
});

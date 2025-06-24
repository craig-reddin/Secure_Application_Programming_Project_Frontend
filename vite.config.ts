import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";
//https://stackoverflow.com/questions/69417788/vite-https-on-localhost
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});

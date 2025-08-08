import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from root directory
  const env = loadEnv(mode, path.resolve(__dirname, ".."), "");

  return {
    plugins: [react()],
    envDir: "..", // Look for .env files in parent directory
    server: {
      port: 3000,
      host: true,
    },
    define: {
      // Make global env vars available to frontend with VITE_ prefix
      "import.meta.env.VITE_API_URL": JSON.stringify(
        env.VITE_API_URL || env.API_URL || "http://localhost:8000"
      ),
      "import.meta.env.VITE_APP_NAME": JSON.stringify(
        env.VITE_APP_NAME || env.APP_NAME || "ParkSync"
      ),
      "import.meta.env.VITE_APP_VERSION": JSON.stringify(
        env.VITE_APP_VERSION || env.APP_VERSION || "1.0.0"
      ),
    },
  };
});

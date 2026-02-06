import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

import { loadConfig } from "./config.js";
import { registerRoutes } from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const staticPath = path.join(__dirname, "..", "public");

const config = loadConfig();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express.static(staticPath, {
    setHeaders(res, filePath) {
      const ext = path.extname(filePath).toLowerCase();

      if (ext === ".html") {
        res.setHeader("Cache-Control", "no-cache");
        return;
      }

      const cacheable = new Set([
        ".css",
        ".js",
        ".mjs",
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".avif",
        ".svg",
        ".ico",
        ".woff",
        ".woff2"
      ]);

      if (cacheable.has(ext)) {
        res.setHeader(
          "Cache-Control",
          "public, max-age=604800, stale-while-revalidate=86400"
        );
      }
    }
  })
);

registerRoutes(app, staticPath, config.smtp);

app.listen(config.port, () => {
  console.log(`Portfolio listening on port ${config.port}`);
});

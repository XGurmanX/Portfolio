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
app.use(express.static(staticPath));

registerRoutes(app, staticPath, config.smtp);

app.listen(config.port, () => {
  console.log(`Portfolio listening on port ${config.port}`);
});

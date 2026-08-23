import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

function startServer(port) {
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split("?")[0];
    if (reqPath === "/") reqPath = "/index.html";

    let filePath = path.join(__dirname, reqPath);
    if (reqPath.startsWith("/dist/")) {
      filePath = path.join(__dirname, "../../", reqPath);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("404 Not Found");
        } else {
          res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      }
    });
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });

  server.listen(port, () => {
    console.log(`\n🚀 Servidor Vanilla HTML5 activo en: http://localhost:${port}\n`);
  });
}

startServer(PORT);

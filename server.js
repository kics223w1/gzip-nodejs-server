// server.js

import http from "http";
import zlib from "zlib";

const PORT = 5230;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/gzip-json") {
    const json = JSON.stringify({
      message: "Hello from gzip server",
      timestamp: Date.now(),
      meta: { ok: true }
    });

    // Compress JSON using gzip
    zlib.gzip(json, (err, buffer) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Compression error");
        return;
      }

      res.writeHead(201, {
        "Content-Type": "application/json",
        "Content-Encoding": "gzip",
        "Content-Length": buffer.length,
      });

      res.end(buffer);
    });

    return;
  }

  // Fallback
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`Gzip test server running at http://localhost:${PORT}`);
});


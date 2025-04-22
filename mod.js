import { dotenv, fsp, mime, path } from "./deps.js";
import { transpile } from "./backend/transpile.js";
import { Server } from "./backend/server.js";
import { isFile } from "./backend/is-file.js";

import API_shopItems from "./backend/api/shop-items.js";

console.log("Transpiling source code...");

const codemap = await transpile("./frontend/mod.tsx");
const sandbox = path.resolve("./frontend");

console.log(`Transpiled ${codemap.size} files.`);
console.log("Starting server...");

const env = dotenv.config({ path: "./.env" }).parsed ?? {};
const server = new Server(env);

console.log("Registiring APIs...");
server.api("shop-items", API_shopItems);

server.on("ready", ({ url }) => {
    console.log(`Listening on \x1b[33m${url.href}\x1b[0m`);
});

server.on("request", async (req, res) => {
    if (req.url === "/") req.url = "/website.html";

    const filepath = path.join(sandbox, req.url);
    console.log(`[LOG]: ${filepath}\n`);

    // Without this, we risk a huge security hole where we can read any file on the system.
    // This is a very simple check, but it works for our use case.
    if (!filepath.startsWith(sandbox)) {
        res.writeHead(403, { "Content-Type": "text/plain" });
        res.end("403 Forbidden");

        return;
    }

    if (!(await isFile(filepath))) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");

        return;
    }

    let contents = "";
    let ext = path.extname(filepath).toLowerCase();

    switch (ext) {
        case ".ts":
        case ".tsx":
        case ".jsx":
            ext = ".js";
            break;
    }

    if (codemap.has(filepath)) {
        contents = codemap.get(filepath);
    } else {
        contents = await fsp.readFile(filepath);
    }

    const mimetype = mime.lookup(ext) ?? "application/octet-stream";

    res.writeHead(200, { "Content-Type": mimetype });
    res.end(contents);
});

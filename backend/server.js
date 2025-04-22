import { buffer, EventEmitter, http } from "../deps.js";

export class Server extends EventEmitter {
    constructor(env = {}) {
        super();

        this.port = env.SERVER_PORT ?? 80;
        this.host = env.SERVER_HOST ?? "localhost";
        this.url = new URL(`http://${this.host}:${this.port}/`);
        this.apis = new Map();

        this.server = http.createServer((req, res) => {
            req.url = decodeURIComponent(req.url);

            console.log("");
            console.log(`[LOG]: (${req.method}) ${req.url}`);
            console.log(`[LOG]: (${req.method}) ${req.headers["user-agent"]}`);

            if (!req.url.startsWith("/api/")) {
                this.emit("request", req, res, this);
                return;
            }

            const api = req.url.slice(5);

            if (!this.apis.has(api)) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        error: `API not found: ${api}`,
                    }),
                );

                return;
            }

            if (req.method !== "POST") {
                this.apis.get(api)(null, req, res);
                return;
            }

            const chunks = [];

            req.on("data", (chunk) => {
                chunks.push(chunk);
            });

            req.on("end", () => {
                const body = buffer.Buffer.concat(chunks).toString();

                try {
                    const json = JSON.parse(body);
                    const responseBody = JSON.stringify(
                        this.apis.get(api)(json, req, res),
                    );

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(responseBody);
                } catch {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(
                        JSON.stringify({
                            error: "Bad JSON message",
                        }),
                    );
                }
            });
        });

        this.server.listen(this.port, this.host, () => {
            this.emit("ready", this);
        });

        this.server.on("error", (err) => {
            this.emit("error", err, this);
        });
    }

    api(name, handler) {
        this.apis.set(name, handler);
    }

    shutdown() {
        this.server.close(() => {
            this.emit("shutdown", this);
        });
    }
}

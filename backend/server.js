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

            const routes = req.url.slice(5).split("/");
            const api = routes.shift();
            const subsection = routes.join("/");

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
                const response = this.apis.get(api)(subsection, null, req, res);
                const responseBody = JSON.stringify(response.body);

                res.writeHead(response.status, {
                    "Content-Type": "application/json",
                });
                res.end(responseBody);

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

                    const response = this.apis.get(api)(
                        subsection,
                        json,
                        req,
                        res,
                    );
                    const responseBody = JSON.stringify(response.body);

                    res.writeHead(response.status, {
                        "Content-Type": "application/json",
                    });
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

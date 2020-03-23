import * as express from "express";
import * as process from "process";
import * as path from "path";
import fetch from "node-fetch";
import { systemLogger as logger, accessLogConnector } from "./loggers";

const clientRootPath = "dist";
const clientRootAbsolutePath = path.join(process.cwd(), clientRootPath);

const server = express();

server.use(accessLogConnector);
server.use(express.static(clientRootPath));

server.get("/api/hello", (req, res) => {
    res.send({ message: "Hello World!" });
});

server.get("*", (req, res) => {
    if (process.env.HMR === "true") {
        fetch(
            `http://localhost:8080${req.originalUrl}`,
            {
                method: req.method,
                headers: req.headers as { [key: string]: string }
            }
        ).then(innerRes => new Promise((resolve, reject) => {
            innerRes.body.pipe(res);
            res.on("close", resolve);
            res.on("error", reject);
        }));
        return;
    }
    res.sendFile("index.html", { root: clientRootAbsolutePath });
});

server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(err);
    next(err);
});

server.listen(3000, () => {
    logger.info("server running");
});

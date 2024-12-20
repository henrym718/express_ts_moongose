import express, { Application, urlencoded } from "express";
import http from "http";
import cors from "cors";
import { logger } from "@config/logger";
import { env } from "@config/env";

export class BootstrapServer {
    private static instance: BootstrapServer;
    private readonly app: Application;
    private httpServer: http.Server | null = null;

    private constructor() {
        this.app = express();
        this.configureMiddleware();
    }

    static getInstance(): BootstrapServer {
        if (!this.instance) {
            this.instance = new BootstrapServer();
        }
        return this.instance;
    }

    private configureMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(urlencoded({ extended: true }));
    }

    public async initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            const PORT = env.PORT;
            this.httpServer = http.createServer(this.app);
            this.httpServer
                .listen(PORT)
                .on("listening", () => {
                    logger.info("Servidor runing on port " + PORT);
                    resolve();
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    }
}

import { z } from "zod";
import path from "path";
import fs from "fs";
import { logger } from "./logger";

const envSchema = z.object({
    PORT: z.string().min(1).transform(Number),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

type EnvConfig = Readonly<z.infer<typeof envSchema>>;

const getEnvConfig = (): EnvConfig => {
    const environment = process.env.NODE_ENV || "development";
    const envPath = path.resolve(process.cwd(), `.env.${environment}`);

    if (!fs.existsSync(envPath)) {
        logger.error(`No se encuentra el archivo de entorno .env.${environment}`);
        process.exit(1);
    }

    process.loadEnvFile(envPath);

    const result = envSchema.safeParse(process.env);

    if (!result.success) {
        const errorFormatted = result.error.issues.map((issue) => `${"\n-"} ${issue.path}: ${issue.message}`).join("");
        logger.error(`Validación de entorno fallida ${errorFormatted}`);
        process.exit(1);
    }

    return result.data;
};

export const env = getEnvConfig();

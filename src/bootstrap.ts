import { BootstrapServer } from "@boostraps/bootstrap.server";
import { env, getEnvConfig } from "@config/env";
import { logger } from "@config/logger";

(async () => {
    try {
        const serverBootstrap = BootstrapServer.getInstance();
        await serverBootstrap.initialize();
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
})();

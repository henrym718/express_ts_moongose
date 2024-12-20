import { BootstrapServer } from "@boostraps/bootstrap.server";

(async () => {
    try {
        const serverBootstrap = BootstrapServer.getInstance();
        await serverBootstrap.initialize();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

import { build, options } from './app.js';
import closeWithGrace from 'close-with-grace';

async function startServer() {
    const server = await build(options);

    try {
        await server.listen({ port: options.port, host: options.host });

        console.log(`Server listening on ${options.host}:${options.port}`);

        closeWithGrace(async ({ signal, err }) => {
            if (err) {
                server.log.error(`Server closing due to an error: ${err.message}`);
            } else {
                server.log.info(`${signal} signal received. Shutting down gracefully.`);
            }

            await server.close();
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
}

startServer();

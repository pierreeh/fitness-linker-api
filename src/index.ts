import { env } from "./config/env";
import { logger } from "./utils/logger";
import { server } from "./utils/server";

async function gracefullShutdown({
  app,
}: {
  app: Awaited<ReturnType<typeof server>>;
}) {
  await app.close();
}

async function main() {
  const app = await server();

  await app.listen({ port: env.PORT, host: env.HOST });

  const signals = ["SIGINT", "SIGTERM"];
  logger.debug(env);
  for (const signal of signals) {
    process.on(signal, () => {
      gracefullShutdown({ app });
    });
  }
}

main();

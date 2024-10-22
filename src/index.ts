import { logger } from "./utils/logger";
import { server } from "./utils/server";
import { env } from "./config/env";

async function stop({ app }: any) {
  await app.close();
}

async function main() {
  try {
    const app = await server();

    app.listen({ port: env.PORT, host: env.HOST });
    process.env.NODE_ENV !== "production" && logger.debug(env);

    const signals = ["SIGINT", "SIGTERM"];
    for (const signal of signals) {
      process.on(signal, () => {
        stop({ app });
      });
    }
  } catch (e: any) {
    throw new Error(e);
  }
}

main();

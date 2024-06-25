import fastify from "fastify";
import { logger } from "./logger";

export async function server() {
  const app = fastify({ logger });

  return app;
}

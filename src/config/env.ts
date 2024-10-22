import zennv from "zennv";
import { z } from "zod";

export const env = zennv({
  dotenv: true,
  schema: z.object({
    PORT: z.number(),
    HOST: z.string(),
    DATABASE_URL: z.string(),
  }),
});

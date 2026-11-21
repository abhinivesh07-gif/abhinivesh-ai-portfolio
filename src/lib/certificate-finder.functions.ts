import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { finderQuerySchema } from "./certificate-finder";
import { findCertificates } from "./certificate-finder.server";

/** Public: any visitor can search the certificate collection with AI. */
export const searchCertificates = createServerFn({ method: "POST" })
  .inputValidator((input: { query: string }) => finderQuerySchema.parse(input))
  .handler(async ({ data }) => findCertificates(data.query, getRequest()));

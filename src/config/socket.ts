import type { IncomingMessage, Server, ServerResponse } from "http";

export const initializeWebSocketServer = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>,
) => {};

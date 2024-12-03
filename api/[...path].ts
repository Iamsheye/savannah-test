import { server } from "../server/src/server";
import { createServer } from "http";

const httpServer = createServer(server);

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    server(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

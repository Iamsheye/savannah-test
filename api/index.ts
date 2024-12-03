import { server } from "../server/src/server";

export default function handler(req, res) {
  // Remove the /api prefix from the request path
  req.url = req.url.replace(/^\/api/, "");

  return new Promise<void>((resolve) => {
    server(req, res, () => {
      resolve();
    });
  });
}

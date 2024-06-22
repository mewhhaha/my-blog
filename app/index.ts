import { router } from "./routes/_router";

const handler: ExportedHandler = {
  fetch: router.all("/*", [], () => new Response("Not found", { status: 404 }))
    .handle,
};

export default handler;

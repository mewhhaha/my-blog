import { router } from "./routes/_router";

type Env = {
  ARTICLES_URL: string;
};

declare module "@mewhhaha/little-worker" {
  interface RouteData {
    extra: [Env, ExecutionContext];
  }
}

const handler: ExportedHandler<Env> = {
  fetch: router.all("/*", [], () => new Response("Not found", { status: 404 }))
    .handle,
};

export default handler;

import { route } from "@mewhhaha/little-worker";

export default route("/*", [], async () => {
  return new Response(null, {
    status: 404,
  });
});

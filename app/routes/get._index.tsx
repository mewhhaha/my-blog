import { route } from "@mewhhaha/little-worker";
import { to } from "../utils/path";

export default route("/", [], async () => {
  return new Response(null, {
    status: 307,
    headers: { Location: to("/home") },
  });
});

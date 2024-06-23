import { body, route } from "@mewhhaha/little-worker";
import favicon from "../../public/favicon.svg";

export default route("/favicon.ico", [], async () => {
  return body(200, favicon, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "max-age=31536000, immutable",
    },
  });
});

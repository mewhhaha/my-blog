import { html, route } from "@mewhhaha/little-worker";
import { Html } from "../components/Html";

export default route("/article/:name", [], async () => {
  return html(200, <Html></Html>);
});

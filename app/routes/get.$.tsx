import { html, route } from "@mewhhaha/little-worker";
import { to } from "../utils/path";
import { Html } from "../components/Html";

export default route("/*", [], async () => {
  return html(
    200,
    <Html>
      <h1 class="flex text-xl">Trying out htmx</h1>
      <form hx-post={to("/add-entry")} hx-swap="innerHTML">
        <input type="text" name="name" placeholder="enter your name" />

        <button>refresh</button>
      </form>
    </Html>,
  );
});

import { html, route } from "@mewhhaha/little-worker";
import { to } from "../utils/path";
import { Html } from "../components/Html";

export default route("/*", [], async () => {
  return html(
    200,
    <Html>
      <h1 class="flex text-xl">Trying out htmx</h1>
      <form>
        <input type="text" name="name" placeholder="enter your name" />

        <button hx-post={to("/add-entry")} hx-swap="outerhtml">
          refresh
        </button>
      </form>
    </Html>,
  );
});

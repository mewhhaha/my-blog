import { html, route } from "@mewhhaha/little-worker";
import { to } from "../utils/path";
import { Html } from "../components/Html";

export default route("/*", [], async () => {
  return html(
    200,
    <Html>
      <header>
        <h1 class="flex text-xl font-bold tracking-widest">Trying out htmx</h1>
        <nav>
          <a
            class="text-blue-500 underline visited:text-purple-600 hover:text-blue-700 active:text-blue-900"
            href={to("/articles/:name", { name: "first.md" })}
          >
            first
          </a>
        </nav>
      </header>

      <form hx-post={to("/add-entry")} hx-swap="innerHTML">
        <input type="text" name="name" placeholder="enter your name" />

        <button>refresh</button>
      </form>
    </Html>,
  );
});

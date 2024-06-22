import { html, route } from "@mewhhaha/little-worker";
import { to } from "../utils/path";
import { Html } from "../components/Html";
import { Header } from "../components/Header";
import { NavLink } from "../components/NavLink";

export default route("/*", [], async () => {
  return html(
    200,
    <Html>
      <Header>
        <nav>
          <NavLink href={to("/*", { "*": "" })} active={true}>
            home
          </NavLink>
          <NavLink href={to("/articles/:name", { name: "first" })}>
            first
          </NavLink>
        </nav>
      </Header>
      <form hx-post={to("/add-entry")} hx-swap="innerHTML">
        <input type="text" name="name" placeholder="enter your name" />

        <button>refresh</button>
      </form>
    </Html>,
  );
});

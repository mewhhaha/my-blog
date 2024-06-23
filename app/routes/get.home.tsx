import { html, route } from "@mewhhaha/little-worker";
import { to } from "../utils/path";
import { Page } from "../components/Page";
import { PageNav } from "../components/PageNav";

const Route = () => {
  return (
    <form hx-post={to("/add-entry")} hx-swap="innerHTML">
      <input type="text" name="name" placeholder="enter your name" />
      <button>refresh</button>
    </form>
  );
};

export default route("/home", [], async ({ request }) => {
  const url = new URL(request.url);

  const content = <Route />;

  if (request.headers.get("HX-Request")) {
    return html(
      200,
      <>
        <nav id="header-nav" hx-swap-oob="true">
          <PageNav url={url} />
        </nav>
        <main id="page" hx-swap-oob="true">
          {content}
        </main>
      </>,
    );
  }

  return html(200, <Page url={url}>{content}</Page>);
});

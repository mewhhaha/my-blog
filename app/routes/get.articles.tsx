import { html, route } from "@mewhhaha/little-worker";
import { Page } from "../components/Page";
import { PageNav } from "../components/PageNav";

export default route("/articles", [], async ({ request }) => {
  const url = new URL(request.url);

  const content = (
    <>
      <section class="mb-8">
        <h2 class="border-b-2 border-black pb-2 text-2xl font-bold">
          Previous Articles
        </h2>
      </section>
    </>
  );

  if (request.headers.get("HX-Request")) {
    return html(
      200,
      <>
        <nav id="header-nav" hx-swap-oob="morph">
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

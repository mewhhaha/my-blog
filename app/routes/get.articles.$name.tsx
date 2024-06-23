import { html, route } from "@mewhhaha/little-worker";
import { marked } from "marked";
import { match } from "../utils/match";
import { Page } from "../components/Page";
import { PageNav } from "../components/PageNav";

export default route(
  "/articles/:name",
  [],
  async ({ request, params: { name } }, env) => {
    const url = new URL(`${name}.md`, env.ARTICLES_URL);
    const response = await fetch(url);

    const content: string = await match(response.status, {
      200: async () => (
        <article class="prose-2xl">{marked(await response.text())}</article>
      ),
      404: () => "Article not found",
      [match.Default]: () => "Failed to fetch article",
    });

    if (request.headers.get("HX-Request")) {
      return html(
        200,
        <>
          <nav id="header-nav" hx-swap-oob="morphdom">
            <PageNav url={url} />
          </nav>
          <main id="page" hx-swap-oob="true">
            {content}
          </main>
        </>,
      );
    }

    return html(200, <Page url={url}>{content}</Page>);
  },
);

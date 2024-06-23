import { html, route } from "@mewhhaha/little-worker";
import { marked } from "marked";
import { match } from "../utils/match";
import { Page } from "../components/Page";
import { PageNav } from "../components/PageNav";
import { fetchArticle } from "../utils/articles";
import insane from "insane";

export default route(
  "/articles/:name",
  [],
  async ({ request, params: { name } }, env) => {
    const url = new URL(request.url);

    const response = await fetchArticle(env, name);

    const content: string = await match(response.status, {
      200: async () => (
        <section class="mb-8">
          <h2 class="border-b-2 border-black pb-2 text-2xl font-bold">
            Drunken ramblings 🍻
          </h2>
          <article hx-disable class="prose-2xl pt-10">
            {insane(await marked(await response.text()), {
              allowedClasses: { code: ["language-tsx"], pre: ["language-tsx"] },
            })}
          </article>
        </section>
      ),
      404: () => "Article not found",
      [match.Default]: () => "Failed to fetch article",
    });

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
  },
);

import { html, route } from "@mewhhaha/little-worker";
import { marked } from "marked";
import { match } from "../utils/match";
import { Page } from "../components/Page";
import { PageNav } from "../components/PageNav";

const cached = async (request: Request) => {
  const cache = caches.default;
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
};

export default route(
  "/articles/:name",
  [],
  async ({ request, params: { name } }, env) => {
    const url = new URL(request.url);

    const articleUrl = new URL(
      `articles/${encodeURI(name)}.md`,
      `${env.REPOSITORY_URL}/${env.GIT_SHA}/`,
    );

    console.log(articleUrl.href);
    const md = new Request(articleUrl.href, {
      method: "GET",
      headers: {
        "Cache-Control":
          env.GIT_SHA === "main" ? "" : "max-age=31536000, immutable",
      },
    });

    const response = await cached(md);

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

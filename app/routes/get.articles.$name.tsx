import { route } from "@mewhhaha/little-worker";
import { marked } from "marked";
import { match } from "../utils/match";
import { fetchArticle } from "../utils/articles";
import { page } from "../components/_htmx";

export default route(
  "/articles/:name",
  [],
  async ({ request, params: { name } }, env) => {
    const response = await fetchArticle(env, name);

    const content: string = await match(response.status, {
      200: async () => (
        <section class="mb-8">
          <h2 class="border-b-2 border-black pb-2 text-2xl font-bold">
            Drunken ramblings 🍻
          </h2>
          <article hx-disable class="prose-2xl pt-10">
            {await marked(await response.text())}
          </article>
        </section>
      ),
      404: () => "Article not found",
      [match.Default]: () => "Failed to fetch article",
    });

    return page(request, content);
  },
);

import { html, route } from "@mewhhaha/little-worker";
import { Html } from "../components/Html";
import { marked } from "marked";

export default route(
  "/articles/:name",
  [],
  async ({ params: { name } }, env) => {
    const url = new URL(name, env.ARTICLES_URL);
    const response = await fetch(url);

    if (response.status === 404) {
      return html(200, <Html>Article not found</Html>);
    }

    if (!response.ok) {
      return html(200, <Html>Failed to fetch article</Html>);
    }

    return html(200, <Html>{marked(await response.text())}</Html>);
  },
);

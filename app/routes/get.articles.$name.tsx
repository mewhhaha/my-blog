import { html, route } from "@mewhhaha/little-worker";
import { Html } from "../components/Html";
import { marked } from "marked";
import { Header } from "../components/Header";
import { NavLink } from "../components/NavLink";
import { to } from "../utils/path";

export default route(
  "/articles/:name",
  [],
  async ({ params: { name } }, env) => {
    const url = new URL(`${name}.md`, env.ARTICLES_URL);
    const response = await fetch(url);

    if (response.status === 404) {
      return html(200, <Page name={name}>Article not found</Page>);
    }

    if (!response.ok) {
      return html(200, <Page name={name}>Failed to fetch article</Page>);
    }

    return html(
      200,
      <Page name={name}>
        <article class="prose-2xl">{marked(await response.text())}</article>
      </Page>,
    );
  },
);

const articles = ["first"];

type PageProps = {
  children?: JSX.Element;
  name: string;
};

const Page = ({ children, name }: PageProps) => {
  return (
    <Html>
      <Header>
        <NavLink href={to("/*", { "*": "" })} active={true}>
          home
        </NavLink>
        {articles.map((article) => {
          return (
            <NavLink
              href={to("/articles/:name", { name: article })}
              active={name === article}
            >
              {article}
            </NavLink>
          );
        })}
      </Header>
      {children}
    </Html>
  );
};

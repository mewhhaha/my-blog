import { html } from "@mewhhaha/little-worker";
import { PageNav } from "./PageNav";
import { Page } from "./Page";

export const page = (request: Request, content: string) => {
  const url = new URL(request.url);
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
};

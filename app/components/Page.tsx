import { Html } from "./Html";
import { PageNav } from "./PageNav";

type PageProps = {
  url: URL;
  children?: JSX.Element;
};

export const Page = ({ url, children }: PageProps) => {
  return (
    <Html>
      <header hx-boost="true" id="header">
        <h1>Jacob's blog</h1>
        <nav id="header-nav">
          <PageNav url={url} />
        </nav>
      </header>
      <main id="page">{children}</main>
    </Html>
  );
};

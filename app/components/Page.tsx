import { Html } from "./Html";
import { PageNav } from "./PageNav";

type PageProps = {
  url: URL;
  children?: JSX.Element;
};

export const Page = ({ url, children }: PageProps) => {
  return (
    <Html>
      <header hx-boost="true" id="header" class="mb-10 flex justify-between">
        <h1 class="flex gap-2 align-top text-xl font-thin tracking-wide">
          <img src="/favicon.ico" class="inline size-10" />
          pleaseno.vodka
        </h1>
        <nav id="header-nav">
          <PageNav url={url} />
        </nav>
      </header>
      <main id="page">{children}</main>
    </Html>
  );
};

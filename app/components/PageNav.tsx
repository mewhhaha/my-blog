import { to } from "../utils/path";
import { NavLink } from "./NavLink";

type Link = {
  path: string;
  label: string;
  end: boolean;
};

const articles = ["first"];

const links: Link[] = [
  { path: to("/home"), label: "Home", end: true },
  ...articles.map((article) => ({
    path: to(`/articles/:name`, { name: article }),
    label: article,
    end: true,
  })),
];

type PageHeaderProps = {
  url: URL;
};

export const PageNav = ({ url }: PageHeaderProps) => {
  return (
    <>
      {links.map((link) => {
        const active = matchPath(link.path, url.pathname, { end: link.end });
        return (
          <NavLink href={link.path} active={active}>
            {link.label}
          </NavLink>
        );
      })}
    </>
  );
};

const matchPath = (
  pattern: string,
  pathname: string,
  { end }: { end?: boolean },
) => {
  const patternSegments = pattern.split("/");
  const pathnameSegments = pathname.split("/");

  if (!end) {
    pathnameSegments.slice(0, patternSegments.length);
  }

  if (end && patternSegments.length !== pathnameSegments.length) {
    return false;
  }

  for (let i = 0; i < patternSegments.length; i++) {
    if (
      patternSegments[i].startsWith(":") &&
      pathnameSegments[i] !== undefined
    ) {
      continue;
    }

    if (patternSegments[i] !== pathnameSegments[i]) {
      return false;
    }
  }
};

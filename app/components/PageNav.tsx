import { to } from "../utils/path";
import { NavLink } from "./NavLink";

type Link = {
  path: string;
  label: string;
  end: boolean;
};

const links: Link[] = [
  { path: to("/home"), label: "Home", end: true },
  { path: to("/articles"), label: "Articles", end: false },
];

type PageHeaderProps = {
  url: URL;
};

export const PageNav = ({ url }: PageHeaderProps) => {
  return (
    <div class="flex gap-4">
      {links.map((link) => {
        const active = matchPath(link.path, url.pathname, { end: link.end });

        return (
          <NavLink href={link.path} active={active}>
            {link.label}
          </NavLink>
        );
      })}
    </div>
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

  return true;
};

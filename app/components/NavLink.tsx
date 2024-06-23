type NavLinkProps = {
  href: string;
  children?: JSX.Element;
  active?: boolean;
};

export const NavLink = ({ active, href, children }: NavLinkProps) => {
  return (
    <a
      id={`navlink:${href}`}
      href={href}
      hx-get={href}
      hx-push-url={active ? "false" : "true"}
      aria-current={active ? "page" : "false"}
      class="text-blue-500 underline visited:text-purple-600 hover:cursor-pointer hover:text-blue-700 active:text-blue-900 aria-current-page:font-bold"
    >
      {children}
    </a>
  );
};

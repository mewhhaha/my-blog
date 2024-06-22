type NavLinkProps = {
  href: string;
  children?: JSX.Element;
  active?: boolean;
};

export const NavLink = ({ active, href, children }: NavLinkProps) => {
  return (
    <a
      hx-get={href}
      hx-push-url="true"
      aria-current={active ? "page" : undefined}
      class="text-blue-500 underline visited:text-purple-600 hover:text-blue-700 active:text-blue-900 aria-current-page:font-bold"
    >
      {children}
    </a>
  );
};

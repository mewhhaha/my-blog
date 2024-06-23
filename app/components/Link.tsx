type LinkProps = {
  href: string;
  children?: JSX.Element;
};

export const Link = ({ href, children }: LinkProps) => {
  return (
    <a
      href={href}
      hx-get={href}
      hx-push-url="true"
      class="text-blue-500 underline visited:text-purple-600 hover:cursor-pointer hover:text-blue-700 active:text-blue-900 aria-current-page:text-black aria-current-page:no-underline aria-current-page:hover:underline"
    >
      {children}
    </a>
  );
};

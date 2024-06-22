type HeaderProps = {
  children?: JSX.Element;
};

export const Header = ({ children }: HeaderProps) => {
  return (
    <header>
      <h1 class="flex text-xl font-bold tracking-widest">Trying out htmx</h1>
      {children}
    </header>
  );
};

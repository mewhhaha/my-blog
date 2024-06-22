// @ts-expect-error The css is there, 100%
import css from "../../tailwind.css";

type HtmlProps = {
  children?: JSX.Element;
};

export const Html = ({ children }: HtmlProps) => {
  return (
    "<!DOCTYPE html>" +
    (
      <html>
        <head>
          <script src="https://unpkg.com/htmx.org@2.0.0"></script>
          <style>{css}</style>
        </head>
        <body>{children}</body>
      </html>
    )
  );
};

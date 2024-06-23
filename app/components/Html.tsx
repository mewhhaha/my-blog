import css from "../../public/tailwind.css";

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
          <script src="https://unpkg.com/htmx-ext-morphdom-swap@2.0.0/morphdom-swap.js"></script>
          <style>{css}</style>
        </head>
        <body hx-ext="morphdom-swap" class="p-4">
          {children}
        </body>
      </html>
    )
  );
};

import css from "../../public/tailwind.css";

type HtmlProps = {
  children?: JSX.Element;
};

export const Html = ({ children }: HtmlProps) => {
  const nonce = crypto.randomUUID();

  return (
    "<!DOCTYPE html>" +
    (
      <html>
        <head>
          <meta
            http-equiv="Content-Security-Policy"
            content={`
script-src 'strict-dynamic' 'nonce-${nonce}' 'unsafe-inline' http: https:; 
object-src 'none'; 
base-uri 'none';
        `}
          ></meta>
          <meta charset="UTF-8"></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <title>pleaseno.vodka</title>
          <script
            /** @ts-expect-error nonce not part of types  */
            nonce={nonce}
            src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/prism.min.js"
          ></script>
          <script
            /** @ts-expect-error nonce not part of types  */
            nonce={nonce}
            src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/plugins/autoloader/prism-autoloader.min.js"
          ></script>
          <script
            /** @ts-expect-error nonce not part of types  */
            nonce={nonce}
          >
            {`
Prism.plugins.autoloader.languages_path = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/'
document.addEventListener('htmx:afterRequest', () => { Prism.highlightAll(); });
            `}
          </script>
          <script
            /** @ts-expect-error nonce not part of types  */
            nonce={nonce}
            src="https://unpkg.com/htmx.org@2.0.0"
          ></script>
          <script
            /** @ts-expect-error nonce not part of types  */
            nonce={nonce}
            src="https://unpkg.com/htmx-ext-morphdom-swap@2.0.0/morphdom-swap.js"
          ></script>
          <link
            rel="stylesheet"
            href="https://unpkg.com/@speed-highlight/core/dist/themes/default.css"
          ></link>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-a11y-dark.min.css"
          ></link>
          <style>{css}</style>
        </head>
        <body hx-ext="morphdom-swap" class="mx-auto max-w-4xl p-4">
          {children}
        </body>
      </html>
    )
  );
};

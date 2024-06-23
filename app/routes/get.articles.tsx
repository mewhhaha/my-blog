import { route } from "@mewhhaha/little-worker";

import { page } from "../components/_htmx";

export default route("/articles", [], async ({ request }) => {
  const content = (
    <>
      <section class="mb-8">
        <h2 class="border-b-2 border-black pb-2 text-2xl font-bold">
          Previous Articles
        </h2>
      </section>
    </>
  );

  return page(request, content);
});

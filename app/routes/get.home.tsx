import { route } from "@mewhhaha/little-worker";
import { Link } from "../components/Link";
import { to } from "../utils/path";
import { page } from "../components/_htmx";

export default route("/home", [], async ({ request }) => {
  const content = (
    <>
      <section class="mb-8">
        <h2 class="border-b-2 border-black pb-2 text-2xl font-bold">
          Latest Blog Post
        </h2>
        <article class="mt-4 border-2 border-black bg-white p-6">
          <h3 class="text-xl font-bold">Title of the Latest Blog Post</h3>
          <p class="mb-4 mt-2">
            A short description or excerpt from the latest blog post...
          </p>
          <Link href={to("/articles/:name", { name: "first" })}>Read more</Link>
        </article>
      </section>
      <section>
        <h2 class="border-b-2 border-black pb-2 text-2xl font-bold">
          About Me
        </h2>
        <p class="mt-4">
          A brief description about who I am, my interests, and what I write
          about...
        </p>
      </section>
    </>
  );

  return page(request, content);
});

import { html, route } from "@mewhhaha/little-worker";

export default route("/add-entry", [], async ({ request }) => {
  const data = await request.formData();

  return html(200, <button>Button pressed {data.get("name")}</button>);
});

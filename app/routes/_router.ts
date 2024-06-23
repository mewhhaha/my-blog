import { Router, type RouteData } from "@mewhhaha/little-worker";
import route_Z2V0LmFydGljbGVzLiRuYW1lLnRzeA from "./get.articles.$name.js";
import route_Z2V0LmhvbWUudHN4 from "./get.home.js";
import route_Z2V0LmFydGljbGVzLnRzeA from "./get.articles.js";
import route_Z2V0Ll9pbmRleC50c3g from "./get._index.js";
import route_Z2V0LltmYXZpY29uLmljb10udHN4 from "./get.[favicon.ico].js";
import route_Z2V0LiQudHN4 from "./get.$.js";
import route_cG9zdC5hZGQtZW50cnkudHN4 from "./post.add-entry.js";
export const router = Router<
  RouteData["extra"] extends unknown[] ? RouteData["extra"] : []
>()
  .get(...route_Z2V0LmFydGljbGVzLiRuYW1lLnRzeA)
  .get(...route_Z2V0LmhvbWUudHN4)
  .get(...route_Z2V0LmFydGljbGVzLnRzeA)
  .get(...route_Z2V0Ll9pbmRleC50c3g)
  .get(...route_Z2V0LltmYXZpY29uLmljb10udHN4)
  .get(...route_Z2V0LiQudHN4)
  .post(...route_cG9zdC5hZGQtZW50cnkudHN4);
const routes = router.infer;
export type Routes = typeof routes;

declare module "@mewhhaha/little-worker" {
  interface RouteData {
    paths:
      | "/articles/:name"
      | "/home"
      | "/articles"
      | "/"
      | "/favicon.ico"
      | "/*"
      | "/add-entry";
  }
}

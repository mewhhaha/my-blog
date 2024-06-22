import { Router, type RouteData } from "@mewhhaha/little-worker";
import route_Z2V0LmFydGljbGVzLiRuYW1lLnRzeA from "./get.articles.$name.js";
import route_Z2V0LiQudHN4 from "./get.$.js";
import route_cG9zdC5hZGQtZW50cnkudHN4 from "./post.add-entry.js";
export const router = Router<
  RouteData["extra"] extends unknown[] ? RouteData["extra"] : []
>()
  .get(...route_Z2V0LmFydGljbGVzLiRuYW1lLnRzeA)
  .get(...route_Z2V0LiQudHN4)
  .post(...route_cG9zdC5hZGQtZW50cnkudHN4);
const routes = router.infer;
export type Routes = typeof routes;

declare module "@mewhhaha/little-worker" {
  interface RouteData {
    paths: "/articles/:name" | "/*" | "/add-entry";
  }
}

import { Router, type RouteData } from "@mewhhaha/little-worker";
import route_Z2V0LmFydGljbGUuJG5hbWUudHN4 from "./get.article.$name.js";
import route_Z2V0LiQudHN4 from "./get.$.js";
import route_cG9zdC5hZGQtZW50cnkudHN4 from "./post.add-entry.js";
export const router = Router<
  RouteData["extra"] extends unknown[] ? RouteData["extra"] : []
>()
  .get(...route_Z2V0LmFydGljbGUuJG5hbWUudHN4)
  .get(...route_Z2V0LiQudHN4)
  .post(...route_cG9zdC5hZGQtZW50cnkudHN4);
const routes = router.infer;
export type Routes = typeof routes;

declare module "@mewhhaha/little-worker" {
  interface RouteData {
    paths: "/article/:name" | "/*" | "/add-entry";
  }
}

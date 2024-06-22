import { RouteData } from "@mewhhaha/little-worker";

type URLParams<path extends string> =
  path extends `${string}:${infer param}/${infer rest}`
    ? { [key in param]: string } & URLParams<rest>
    : path extends `${string}:${infer param}`
      ? { [key in param]: string }
      : path extends `${string}/*`
        ? { ["*"]: string }
        : Record<never, never>;

export const to = <PATH extends RouteData["paths"]>(
  path: PATH,
  ...[params]: Record<never, never> extends URLParams<PATH>
    ? []
    : [params: URLParams<PATH>]
): string => {
  if (params === undefined) return path;

  const segments = path.split("/").map((segment) => {
    if (segment.startsWith(":")) {
      return params[segment.slice(1) as keyof typeof params];
    }

    return segment;
  });

  return segments.join("/");
};

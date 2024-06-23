export const fetchArticle = async (env: Env, name: string) => {
  const articleUrl = new URL(
    `articles/${encodeURI(name)}.md`,
    `${env.REPOSITORY_URL}/${env.GIT_SHA}/`,
  );

  const request = new Request(articleUrl.href, {
    method: "GET",
    headers: {
      "Cache-Control":
        env.GIT_SHA === "main" ? "" : "max-age=31536000, immutable",
    },
  });

  const cache = caches.default;
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
};

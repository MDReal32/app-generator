export const getContent = () => {
  return `import { createApp } from "./main";
import { renderToString, SSRContext } from "@vue/server-renderer";

export async function render(url: string, manifest: Record<string, string[]>) {
  const { app, router } = createApp();
  await router.push(url);
  await router.isReady();
  const ctx: SSRContext = {};
  const html = await renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return [html, preloadLinks];
}

function renderPreloadLinks(modules: string[], manifest: Record<string, string[]>) {
  let links = "";
  const seen = new Set();
  modules.forEach(id => {
    if (manifest[id]) {
      manifest[id].forEach(file => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file: string) {
  if (file.endsWith(".js")) {
    return \`<link rel="modulepreload" crossorigin href="\${file}" />\`;
  } else if (file.endsWith(".css")) {
    return \`<link rel="stylesheet" href="\${file}" />\`;
  } else if (file.endsWith(".woff")) {
    return \`<link rel="preload" href="\${file}" as="font" type="font/woff" crossorigin />\`;
  } else if (file.endsWith(".woff2")) {
    return \`<link rel="preload" href="\${file}" as="font" type="font/woff2" crossorigin />\`;
  } else if (file.endsWith(".gif")) {
    return \`<link rel="preload" href="\${file}" as="image" type="image/gif" />\`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return \`<link rel="preload" href="\${file}" as="image" type="image/jpeg" />\`;
  } else if (file.endsWith(".png")) {
    return \`<link rel="preload" href="\${file}" as="image" type="image/png" />\`;
  } else {
    return "";
  }
}
`;
};

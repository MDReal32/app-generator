import { Technologies } from "../typescript/enums";
import { IConfig } from "../typescript/interfaces";

export const getContent = (config: IConfig) => {
  const extEnding = config.technology === Technologies.React ? "x" : "";

  return `// @ts-check
const { readFileSync } = require("fs");
const { resolve: res } = require("path");
const express = require("express");
const { createServer: viteCreateServer } = require("vite");
const { format } = require("prettier");
const { minify } = require("html-minifier");

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
const resolve = p => res(__dirname, p);
const PORT = process.env.PORT || 3000;

const prettierConfig = JSON.parse(readFileSync("./.prettierrc", "utf-8"));
const minifyOptions = {
  removeComments: true,
  collapseWhitespace: true,
  html5: true,
  minifyURLs: true,
  quoteCharacter: '"',
  removeRedundantAttributes: true,
  sortAttributes: true,
  sortClassName: true
};

const config = {
  logLevel: isTest ? "error" : "info",
  server: {
    middlewareMode: "ssr",
    watch: {
      usePolling: true,
      interval: 100
    }
  }
};

const createServer = async (
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production"
) => {
  const indexProd = isProd ? readFileSync(resolve("dist/client/index.html"), "utf-8") : "";
  const manifest = isProd ? require("./dist/client/ssr-manifest.json") : {};
  const app = express();
  let vite;
  config.root = root;

  if (isProd) {
    app.use(
      require("compression")(),
      require("serve-static")(resolve("dist/client"), { index: false })
    );
  } else {
    vite = await viteCreateServer(config);
    app.use(vite.middlewares);
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      const template = isProd
        ? indexProd
        : await vite.transformIndexHtml(url, readFileSync(resolve("index.html"), "utf-8"));

      const { render } = isProd
        ? require("./dist/server/entry-server.js")
        : await vite.ssrLoadModule("/src/entry-server.js${extEnding}");

      const [appHtml, preloadLinks] = await render(url, manifest);

      const html = template
        .replace(/<!--preload-links-->/, preloadLinks)
        .replace(\`<!--app-html-->\`, appHtml);

      const formattedHtml = isProd
        ? minify(html, minifyOptions)
        : format(html, Object.assign({ parser: "html" }, prettierConfig));

      res.status(200).set({ "Content-Type": "text/html" }).end(formattedHtml);
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  // @ts-ignore
  return { app, vite };
};

const start = async () => {
  const { app } = await createServer();
  app.listen(PORT, () => console.log(\`http://localhost:\${PORT}\`));
};

if (!isTest) {
  start().then();
}

module.exports = { createServer };
`;
};

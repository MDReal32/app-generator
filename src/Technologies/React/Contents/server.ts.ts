import { IConfig } from "../../../config";

export const getContent = (config: IConfig) => {
  return `// @ts-check
// @ts-ignore
import express from "express";
import { readFileSync } from "fs";
import { resolve as res } from "path";
import { StaticRouterContext } from "react-router";
import { createServer as viteCreateServer, ViteDevServer } from "vite";

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
const resolve = (p: string) => res(__dirname, p);
const app = express();

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === "production") {
  const indexProd = isProd ? readFileSync(resolve("dist/client/index.html"), "utf-8") : "";

  let viteApp: ViteDevServer;
  if (!isProd) {
    viteApp = await viteCreateServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: "ssr",
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      }
    });

    // use vite's connect instance as middleware
    app.use(viteApp.middlewares);
  } else {
    app
      .use(require("compression")())
      .use(require("serve-static")(resolve("dist/client"), { index: false }));
  }

  app.use("*", async (req, res) => {
    try {
      const { originalUrl: url } = req;
      const context: StaticRouterContext = {};

      let template: string, render: (url: string, context: StaticRouterContext) => string;
      if (!isProd) {
        // always read fresh template in dev
        template = readFileSync(resolve("index.html"), "utf-8");
        template = await viteApp.transformIndexHtml(url, template);
        render = (await viteApp.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = indexProd;
        render = require("./dist/server/entry-server.js").render;
      }

      const appHtml = render(url, context);
      if (context.url) {
        // Somewhere a \`<Redirect>\` was rendered
        return res.redirect(301, context.url);
      }

      const html = template.replace(\` <
    !--app - html-- >
    \`, appHtml);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      !isProd && viteApp.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  // @ts-ignore
  return { app, vite: viteApp };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    })
  );
}

// for test use
exports.createServer = createServer;
`;
};

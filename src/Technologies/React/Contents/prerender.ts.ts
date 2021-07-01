import { IConfig } from "../../../config";

export const getContent = (config: IConfig) => {
  return `// Pre-render the app into static HTML.
// run \`yarn generate\` and then \`dist/static\` can be served as a static site.

const { readFileSync, writeFileSync, readdirSync } = require("fs");
const { resolve } = require("path");

const toAbsolute = (p: string) => resolve(__dirname, p);
const template = readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const { render } = require("./dist/server/entry-server.js");

// determine routes to pre-render from src/pages
const routesToPrerender = readdirSync(toAbsolute("src/pages")).map((file: string) => {
  const name = file.replace(/\.tsx$/, "").toLowerCase();
  return name === "home" ? \`/\` : \`/\${name}\`;
});

(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const context = {};
    const appHtml = await render(url, context);

    const html = template.replace(\`<!--app-html-->\`, appHtml);

    const filePath = \`dist/static\${url === "/" ? "/index" : url}.html\`;
    writeFileSync(toAbsolute(filePath), html);
    console.log("pre-rendered:", filePath);
  }
})();
`;
};

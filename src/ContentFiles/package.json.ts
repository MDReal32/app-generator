import { IConfig } from "../typescript/interfaces";
import { Technologies } from "../typescript/enums";
import { PackageJson } from "type-fest";

export const getContent = (config: IConfig): string => {
  const ext =
    (config.typescript ? "ts" : "js") + (config.technology === Technologies.React ? "x" : "");
  const node = config.typescript ? "ts-node" : "node";
  const name = config.technology === Technologies.React ? "react" : "vue";

  const packageJSON: PackageJson = {
    name,
    description: config.description,
    private: true,
    version: "0.0.0",
    scripts: {
      "dev": `${node} server`,
      "build": "yarn build:client && yarn build:server",
      "build:client": "vite build --ssrManifest --outDir dist/client",
      "build:server": `vite build --ssr src/entry-server.${ext} --outDir dist/server`,
      "generate": `vite build --ssrManifest --outDir dist/static && yarn build:server && ${node} prerender`,
      "serve": `cross-env NODE_ENV=production ${node} server`
    },
    author: config.author,
    dependencies: {},
    devDependencies: {}
  };

  return JSON.stringify(packageJSON, null, 2);
};

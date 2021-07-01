import { IConfig } from "../../../config";

export const getContent = (config: IConfig): string => {
  const ext = config.ts ? "tsx" : "jsx";
  const node = config.ts ? "ts-node" : "node";

  const packageJSON = {
    name: "ssr-react",
    private: true,
    version: "0.0.0",
    scripts: {
      "dev": `${node} server`,
      "build": "yarn build:client && yarn build:server",
      "build:client": "vite build --outDir dist/client",
      "build:server": `vite build --ssr src/entry-server.${ext} --outDir dist/server`,
      "generate": `vite build --outDir dist/static && yarn build:server && ${node} prerender`,
      "serve": `cross-env NODE_ENV=production ${node} server`
    },
    dependencies: [],
    devDependencies: []
  };

  return JSON.stringify(packageJSON, null, 2);
};

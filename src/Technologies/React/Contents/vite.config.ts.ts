import { IConfig } from "../../../config";

export const getContent = (config: IConfig) => {
  return `const reactRefresh = require("@vitejs/plugin-react-refresh");
const { createHash } = require("crypto");
const { name: packageJSONName } = require("./package.json");

const getHash = entry => createHash("sha256").update(entry).digest("hex").slice(0, 5);

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [reactRefresh()],
  css: {
    modules: {
      localsConvention: "dashesOnly",
      generateScopedName(name, fileName, css) {
        const hash = getHash(css);
        const devClassName = \`\${name}--\${hash}\`;
        const prodClassName = \`\${packageJSONName[0]}\${getHash(devClassName)}\`;

        return process.env.NODE_ENV === "development" ? devClassName : prodClassName;
      }
    }
  },
  build: {
    minify: process.env.NODE_ENV === "production"
  }
};
`;
};

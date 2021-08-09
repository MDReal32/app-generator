import { IConfig } from "../typescript/interfaces";
import { Technologies } from "../typescript/enums";

export const getContent = (config: IConfig) => {
  const pluginName = config.technology === Technologies.React ? "reactRefresh" : "vuePlugin";
  const pluginPackage = config.technology === Technologies.React ? "react-refresh" : "vue";
  const importPlugin = `const ${pluginName} = require("@vitejs/plugin-${pluginPackage}");`;

  const plugins: string[] = [
    config.technology === Technologies.React ? "reactRefresh" : "vuePlugin"
  ];

  return `${importPlugin}
const { createHash } = require("crypto");
const { name: packageJSONName } = require("./package.json");

const getHash = entry => createHash("sha256").update(entry).digest("hex").slice(0, 5);

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [${plugins.map(plugin => `${plugin}()`).join(", ")}],
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

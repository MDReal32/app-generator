import { IConfig } from "../typescript/interfaces";
import { Technologies } from "../typescript/enums";

export const getContent = (config: IConfig) => {
  const pluginName = config.technology === Technologies.React ? "reactRefresh" : "vuePlugin";
  const pluginPackage = config.technology === Technologies.React ? "react-refresh" : "vue";
  const importPlugin = `import ${pluginName} from "@vitejs/plugin-${pluginPackage}";`;

  const plugins: string[] = [
    config.technology === Technologies.React ? "reactRefresh" : "vuePlugin"
  ];

  return `${importPlugin}
import { createHash } from "crypto";
// @ts-ignore
import { name as packageJSONName } from "./package.json";

const getHash = (entry: string) => createHash("sha256").update(entry).digest("hex").slice(0, 5);
module.exports = {
  plugins: [${plugins.map(plugin => `${plugin}()`).join(", ")}],
  css: {
    modules: {
      localsConvention: "dashesOnly",
      generateScopedName(name: string, fileName: string, css: string) {
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

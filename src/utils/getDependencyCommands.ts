import { PackageManager } from "../PackageManager/PackageManager";
import { IConfig } from "../typescript/interfaces";
import { Bundlers, Technologies } from "../typescript/enums";

export const getDependencyCommands = (config: IConfig, packageManager: PackageManager) => {
  const dependencies: string[] = ["html-minifier"];
  const devDependencies: string[] = [
    "compression",
    "prettier",
    "serve-static",
    "cross-env",
    "express",
    "vite",
    "@types/prettier",
    "@types/html-minifier"
  ];

  if (config.technology === Technologies.React)
    dependencies.push("react", "react-dom", "react-router", "react-router-dom");

  if (config.technology === Technologies.Vue) {
    const vueVersion = config.vueVersion || config.bundler === Bundlers.ViteJS ? 3 : 2;
    const vuePackage = vueVersion === 3 ? `vue@next` : "vue";
    const vueRouterPackage = vueVersion === 3 ? `vue-router@next` : "vue-router";

    dependencies.push(vuePackage, vueRouterPackage);
  }

  if (config.technology === Technologies.React)
    devDependencies.push("@vitejs/plugin-react-refresh");

  if (config.technology === Technologies.Vue)
    devDependencies.push("@vitejs/plugin-vue", "@vue/compiler-sfc", "@vue/server-renderer");

  if (config.typescript) {
    devDependencies.push("@types/express", "@types/node", "ts-node");

    if (config.technology === Technologies.React) {
      devDependencies.push("@types/react", "@types/react-router-dom");
    }
  }

  return [packageManager.save(...dependencies), packageManager.saveDev(...devDependencies)];
};

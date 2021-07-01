import { IConfig } from "../config";
import { PackageManager } from "../PackageManager/PackageManager";

export const getDependencyCommands = (config: IConfig, packageManager: PackageManager) => {
  const depList = ["react", "react-dom", "react-router", "react-router-dom"];

  const devDepList = [
    "@vitejs/plugin-react-refresh",
    "compression",
    "cross-env",
    "express",
    "serve-static",
    "vite",
    "prettier"
  ];
  if (config.ts)
    devDepList.push(
      "@types/express",
      "@types/node",
      "@types/react",
      "@types/react-router-dom",
      "ts-node"
    );

  return [packageManager.save(...depList), packageManager.saveDev(...devDepList)];
};

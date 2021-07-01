import { mkdirSync } from "fs";
import { Builder } from "./Builder/Builder";
import { IConfig } from "./config";
import { getPackageManager } from "./PackageManager";

export const generate = (root: string, config: IConfig) => {
  const packageManager = getPackageManager();

  // @ts-ignore
  const builder: Builder = require(`./Technologies/${config.technology}`)[config.technology](
    config,
    packageManager
  );

  mkdirSync(root, { recursive: true });
  builder.log().build(root);
};

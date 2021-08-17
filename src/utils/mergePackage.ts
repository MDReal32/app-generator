import { IConfig } from "../typescript/interfaces";
import { resolve } from "path";
import { PackageJson } from "type-fest";
import { writeFileSync } from "fs";

export const mergePackage = (config: IConfig) => {
  let packageJSON: PackageJson = require(resolve(config.root, "package.json"));
  packageJSON = Object.assign(packageJSON, {
    name: config.name,
    description: config.description,
    author: config.author
  });
  writeFileSync(resolve(config.root, "package.json"), JSON.stringify(packageJSON, null, 2));
};

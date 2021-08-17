import { Builder } from "./Builder/Builder";
import { Technologies } from "./typescript/enums";
import { IConfig } from "./typescript/interfaces";
import { CommandBuilder } from "./Builder/CommandBuilder";
import { mergePackage } from "./utils/mergePackage";

export const generate = async (config: IConfig) => {
  const { technology, framework = "", bundler = "", ssr = false } = config;
  const frameworkBundler = technology === Technologies.Express ? framework : bundler;
  const isSSR = technology === Technologies.Express ? "" : `/${ssr ? "" : "no-"}ssr`;
  const module = `./Technologies/${technology}/${frameworkBundler}${isSSR}`;
  const { get } = require(module);
  const builder: Builder = get(config);
  await builder.log().build(config.root);
  if (builder instanceof CommandBuilder) {
    await mergePackage(config);
  }
};

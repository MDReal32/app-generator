import { Builder } from "./Builder/Builder";
import { Technologies } from "./typescript/enums";
import { IConfig } from "./typescript/interfaces";

export const generate = (config: IConfig) => {
  const { technology, framework = "", bundler = "", ssr = false } = config;
  const frameworkBundler = technology === Technologies.Express ? framework : bundler;
  const isSSR = technology === Technologies.Express ? "" : `/${ssr ? "" : "no-"}ssr`;
  const module = `./Technologies/${technology}/${frameworkBundler}${isSSR}`;
  const { get } = require(module);
  const builder: Builder = get(config);
  builder.log().build(config.root);
};

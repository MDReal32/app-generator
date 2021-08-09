import { Builder } from "../../../../Builder/Builder";
import { CommandBuilder } from "../../../../Builder/CommandBuilder";
import { IConfig } from "../../../../typescript/interfaces";

export const get = (config: IConfig): Builder => {
  return new CommandBuilder("echo").addArgument("WebpackSSR");
};

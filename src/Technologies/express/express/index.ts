import { Builder } from "../../../Builder/Builder";
import { CommandBuilder } from "../../../Builder/CommandBuilder";
import { getPackageManager } from "../../../PackageManager";
import { IConfig } from "../../../typescript/interfaces";
import { buildCSSEngine, buildEngine } from "./utils";

export const get = (config: IConfig): Builder => {
  if (config.typescript) {
    return new CommandBuilder("echo").addArgument("TypeScript");
  } else {
    const builder = new CommandBuilder("npx").addArgument("express-generator").addOption("git");
    buildEngine(config.engine!, builder);
    buildCSSEngine(config.cssPreprocessor!, builder);
    builder.addArgument(config.name).addCommand(getPackageManager().install());

    return builder;
  }
};

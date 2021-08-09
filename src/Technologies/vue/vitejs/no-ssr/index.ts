import { Builder } from "../../../../Builder/Builder";
import { CommandBuilder } from "../../../../Builder/CommandBuilder";
import { getPackageManager } from "../../../../PackageManager";
import { IConfig } from "../../../../typescript/interfaces";

export const get = (config: IConfig): Builder => {
  const pm = getPackageManager().getPackageManager();
  return new CommandBuilder(pm)
    .addArgument(pm === "yarn" ? "create" : "init")
    .addArgument("@vitejs/app")
    .addArgument(".")
    .addOption("template", `vue${config.typescript ? "-ts" : ""}`);
};

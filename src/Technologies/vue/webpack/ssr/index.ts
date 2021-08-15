import { Builder } from "../../../../Builder/Builder";
import { CommandBuilder } from "../../../../Builder/CommandBuilder";
import { IConfig } from "../../../../typescript/interfaces";
import { getPackageManager } from "../../../../PackageManager";

export const get = (config: IConfig): Builder => {
  const pm = getPackageManager().getPackageManager();
  const baseCommand = pm === "yarn" ? "yarn" : "npx";
  const builder = new CommandBuilder(baseCommand);

  if (pm === "yarn") builder.addArgument("create").addArgument("nuxt-app");
  else builder.addArgument("create-nuxt-app");
  builder.addArgument(".");
  // if (config.typescript) builder.addOption("typescript");

  return new CommandBuilder("echo").addArgument("WebpackSSR");
};

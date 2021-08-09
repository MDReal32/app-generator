import { Builder } from "../../../../Builder/Builder";
import { CommandBuilder } from "../../../../Builder/CommandBuilder";
import { getPackageManager } from "../../../../PackageManager";
import { IConfig } from "../../../../typescript/interfaces";

export const get = (config: IConfig): Builder => {
  const pm = getPackageManager().getPackageManager();
  const baseCommand = pm === "yarn" ? "yarn" : "npx";
  const builder = new CommandBuilder(baseCommand);

  if (pm === "yarn") builder.addArgument("create").addArgument("react-app");
  else builder.addArgument("create-react-app");
  builder.addArgument(".");
  if (config.typescript) builder.addOption("template", "typescript");

  return builder;
};

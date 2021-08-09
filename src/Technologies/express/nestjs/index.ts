import { Builder } from "../../../Builder/Builder";
import { CommandBuilder } from "../../../Builder/CommandBuilder";
import { getPackageManager } from "../../../PackageManager";
import { IConfig } from "../../../typescript/interfaces";

export const get = (config: IConfig): Builder => {
  const pm = getPackageManager().getPackageManager();
  return new CommandBuilder("npx")
    .addOption("p", "@nestjs/cli")
    .addArgument("nest")
    .addArgument("new")
    .addArgument(".")
    .addOption("skip-git")
    .addOption("package-manager", pm)
    .addOption("language", config.typescript ? "TypeScript" : "JavaScript");
};

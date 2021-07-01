import { CommandBuilder } from "../../Builder/CommandBuilder";
import { CSSEngine, Engines, Frameworks, IConfig } from "../../config";
import { PackageManager } from "../../PackageManager/PackageManager";

export const buildEngine = (engine: Engines, builder: CommandBuilder): void => {
  if (engine === Engines.Hogan || engine === Engines.NoView) {
    // @ts-ignore
    builder.addOption(Engines[engine.toString()]);
  } else {
    // @ts-ignore
    builder.addOption("view", Engines[engine.toString()]);
  }
};

export const buildCSSEngine = (cssEngine: CSSEngine, builder: CommandBuilder): void => {
  if (cssEngine === CSSEngine.Plain) return;
  // @ts-ignore
  builder.addOption("css", CSSEngine[cssEngine.toString()]);
};

const expressFrameworks: Record<
  Frameworks,
  (config: IConfig, packageManager: PackageManager) => CommandBuilder
> = {
  [Frameworks.Express](config, packageManager) {
    const builder = new CommandBuilder("npx").addArgument("express-generator").addOption("git");
    buildEngine(config.engine, builder);
    buildCSSEngine(config.cssEngine, builder);
    builder.addCommand(packageManager.install());
    return builder;
  },
  [Frameworks.NestJS](config, packageManager) {
    const pm = packageManager.getPackageManager();
    return new CommandBuilder("npx")
      .addOption("p", "@nestjs/cli")
      .addArgument("nest")
      .addArgument("new")
      .addArgument(".")
      .addOption("skip-git")
      .addOption("package-manager", pm)
      .addOption("language", config.ts ? "TypeScript" : "JavaScript");
  }
};

export const Express = (config: IConfig, packageManager: PackageManager): CommandBuilder => {
  return expressFrameworks[config.framework](config, packageManager);
};

import { resolve } from "path";
import { Builder } from "../../Builder/Builder";
import { CommandBuilder } from "../../Builder/CommandBuilder";
import { FileManagerBuilder } from "../../Builder/FileManagerBuilder";
import { Bundlers, IConfig } from "../../config";
import { PackageManager } from "../../PackageManager/PackageManager";
import { getDependencyCommands } from "../../utils/getDependencyCommands";

const bundlers: Record<
  Bundlers,
  Record<"ssr" | "nossr", (config: IConfig, packageManager: PackageManager) => Builder>
> = {
  webpack: {
    ssr(config, packageManager) {
      const pm = packageManager.getPackageManager();
      const baseCommand = pm === "yarn" ? "yarn" : "npx";
      const builder = new CommandBuilder(baseCommand);

      if (pm === "yarn") builder.addArgument("create").addArgument("next-app");
      else builder.addArgument("create-next-app");
      builder.addArgument(".");
      if (config.ts) builder.addOption("typescript");

      return builder;
    },
    nossr(config, packageManager) {
      const pm = packageManager.getPackageManager();
      const baseCommand = pm === "yarn" ? "yarn" : "npx";
      const builder = new CommandBuilder(baseCommand);

      if (pm === "yarn") builder.addArgument("create").addArgument("react-app");
      else builder.addArgument("create-react-app");
      builder.addArgument(".");
      if (config.ts) builder.addOption("template", "typescript");

      return new CommandBuilder(baseCommand);
    }
  },
  vitejs: {
    ssr(config, packageManager) {
      const ext = config.ts ? "ts" : "js";
      const [deps, devDeps] = getDependencyCommands(config, packageManager);

      const builder = new FileManagerBuilder(resolve(__dirname, "Contents"), config)
        .addContent("package.json")
        .addContent("index.html")
        .addContent(".prettierrc")
        .addContent(".editorconfig")
        .addContent(`prerender.${ext}`)
        .addContent(`server.${ext}`)
        .addContent(`vite.config.${ext}`)
        .addContent(`src/entry-client.${ext}x`)
        .addContent(`src/entry-server.${ext}x`)
        .addContent(`src/App.${ext}x`)
        .addContent(`src/pages/Home.${ext}x`)
        .addContent(`src/pages/About.${ext}x`)
        .execute(deps)
        .execute(devDeps);

      if (config.ts) builder.addContent("tsconfig.json");

      return builder;
    },
    nossr(config, packageManager) {
      const pm = packageManager.getPackageManager();
      return new CommandBuilder(pm)
        .addArgument(pm === "yarn" ? "create" : "init")
        .addArgument("@vitejs/app")
        .addArgument(".")
        .addOption("template", `react${config.ts ? "-ts" : ""}`);
    }
  }
};

export const React = (config: IConfig, packageManager: PackageManager) => {
  return bundlers[config.bundler][config.ssr ? "ssr" : "nossr"](config, packageManager);
};

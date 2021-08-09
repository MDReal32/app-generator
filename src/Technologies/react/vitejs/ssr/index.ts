import { resolve } from "path";
import { Builder } from "../../../../Builder/Builder";
import { FileManagerBuilder } from "../../../../Builder/FileManagerBuilder";
import { getPackageManager } from "../../../../PackageManager";
import { IConfig } from "../../../../typescript/interfaces";
import { getDependencyCommands } from "../../../../utils/getDependencyCommands";

export const get = (config: IConfig): Builder => {
  const ext = config.typescript ? "ts" : "js";
  const [deps, devDeps] = getDependencyCommands(config, getPackageManager());

  const builder = new FileManagerBuilder(resolve(__dirname, "../../../../ContentFiles"), config)
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

  if (config.typescript) builder.addContent("tsconfig.json");

  return builder;
};

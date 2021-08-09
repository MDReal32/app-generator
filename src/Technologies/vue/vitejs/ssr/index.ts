import { Builder } from "../../../../Builder/Builder";
import { IConfig } from "../../../../typescript/interfaces";
import { FileManagerBuilder } from "../../../../Builder/FileManagerBuilder";
import { resolve } from "path";
import { getDependencyCommands } from "../../../../utils/getDependencyCommands";
import { getPackageManager } from "../../../../PackageManager";

export const get = (config: IConfig): Builder => {
  const ext = config.typescript ? "ts" : "js";
  const [deps, devDeps] = getDependencyCommands(config, getPackageManager());

  const builder = new FileManagerBuilder(resolve(__dirname, "../../../../ContentFiles"), config)
    .addContent("index.html")
    .addContent(".prettierrc")
    .addContent(".editorconfig")
    .addContent("package.json")
    .addContent(`prerender.${ext}`)
    .addContent(`server.${ext}`)
    .addContent(`vite.config.${ext}`)
    .addContent(`src/main.${ext}`)
    .addContent(`src/entry-client.${ext}`)
    .addContent(`src/entry-server.${ext}`)
    .addContent(`src/App.vue`)
    .addContent(`src/router.${ext}`)
    .addContent(`src/pages/Home.vue`)
    .addContent(`src/pages/About.vue`)
    .execute(deps)
    .execute(devDeps);

  if (config.typescript)
    builder
      .addContent("tsconfig.json")
      .addContent(`src/shims-vue.d.ts`)
      .addContent(`src/vite-env.d.ts`);

  return builder;
};

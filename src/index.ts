import { generate } from "./generate";
import { Bundlers, Technologies } from "./typescript/enums";
import { IConfig } from "./typescript/interfaces";

const root = "W:\\Projects\\Tech\\NodeJSApps\\app-generator\\app";

const config: IConfig = {
  root,
  name: "app",
  description: "Description",
  author: "MDReal <veysaliyev00@gmail.com>",
  technology: Technologies.Vue,
  bundler: Bundlers.ViteJS,
  ssr: true,
  typescript: true
};

generate(config);

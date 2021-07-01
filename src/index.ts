import { resolve } from "path";
import yargs from "yargs";
import { getConfig } from "./config";
import { generate } from "./generate";

// @ts-ignore
const name = yargs.command("[root]", "").parse()._[0];
if (!name) {
  console.error(`Usage ${process.argv[0]} ${process.argv[1]} [root-dir]`);
  process.exit(1);
}

const root = resolve(process.cwd(), name as string);
getConfig().then(config => {
  generate(root, config);
});

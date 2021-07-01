const yargs = require("yargs");
const { resolve } = require("path");
const { getConfig } = require("../dist/config");
const { generate } = require("../dist/generate");

const name = yargs.command("[root]", "").parse()._[0];
if (!name) {
  console.error(`Usage ${process.argv[0]} ${process.argv[1]} [root-dir]`);
  process.exit(1);
}

const root = resolve(process.cwd(), name);
getConfig().then(config => {
  generate(root, config);
});

import { mkdir, writeFile } from "fs/promises";
import { dirname, resolve } from "path";
import { IConfig } from "../typescript/interfaces";
import { Builder } from "./Builder";
import { CommandBuilder } from "./CommandBuilder";

export class FileManagerBuilder extends Builder {
  private files: Record<string, string> = {};
  private executeCommands: CommandBuilder[] = [];
  private logging = false;

  constructor(private readonly root: string, private readonly config: IConfig) {
    super();
    this.root = this.root || config.root || process.cwd();
  }

  execute(command: string) {
    const cmds = command.split(" ");
    const commandBuilder = new CommandBuilder(cmds[0]);
    cmds.slice(1).forEach(commandBuilder.addArgument.bind(commandBuilder));
    this.executeCommands.push(commandBuilder);

    return this;
  }

  addContent(file: string) {
    const path = resolve(this.root, file);
    try {
      require.resolve(path);
      this.files[file] = require(path).getContent(this.config);
    } catch (e) {
      throw new Error(`Module\n  "${path}.ts" not found`);
    }

    return this;
  }

  log() {
    this.logging = true;
    return this;
  }

  async build(root: string) {
    for (const [file, content] of Object.entries(this.files)) {
      if (this.logging) {
        console.log(`File: ${file}`);
      }
      const filePath = resolve(root, file);
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, content);
    }

    for (const command of this.executeCommands) {
      await command.build(root);
    }
  }
}

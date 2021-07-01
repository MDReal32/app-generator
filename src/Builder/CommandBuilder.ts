import spawn from "cross-spawn";
import { inspect } from "util";
import { Builder } from "./Builder";

export class CommandBuilder extends Builder {
  private cmd: (string | symbol)[] = [];
  private otherCommandSymbol = Symbol("nodejs.command-builder.other-symbol");

  constructor(baseCommand: string = "") {
    super();
    if (baseCommand) this.cmd.push(baseCommand);
  }

  addArgument(key: string) {
    this.cmd.push(key);

    return this;
  }

  addCommand(cmd: string) {
    this.next();
    this.cmd.push(...cmd.split(" "));
    return this;
  }

  addOption(key: string, value: any = true) {
    if (!key) throw new Error("No key");
    const dashes = key.length === 1 ? "-" : "--";

    if (typeof value === "boolean") {
      if (value) {
        this.cmd.push(`${dashes}${key}`);
      } else {
        this.cmd.push(`${dashes}${key}`, String(value));
      }
    } else {
      this.cmd.push(`${dashes}${key}`, String(value));
    }

    return this;
  }

  next() {
    this.cmd.push(this.otherCommandSymbol);
    return this;
  }

  private getCommand() {
    return this.cmd.map(e => (e === this.otherCommandSymbol ? ";" : e)).join(" ");
  }

  [inspect.custom]() {
    return `CommandBuilder { command: "${this.getCommand()}" }`;
  }

  log() {
    console.log(`Executing command ${this.getCommand()}`);

    return this;
  }

  async build(root: string) {
    this.cmd.push(this.otherCommandSymbol);
    let cmd: string[] = [];

    while (this.cmd.length) {
      const cmdArg = this.cmd[0];
      this.cmd.splice(0, 1);

      if (cmdArg === this.otherCommandSymbol) {
        await new Promise<void>((res, rej) => {
          if (!cmd.length) return res();
          const child = spawn(cmd[0], cmd.slice(1), { cwd: root, stdio: "inherit" });
          child.on("exit", res);
          child.on("error", rej);
        });

        cmd = [];
        continue;
      }
      cmd.push(cmdArg as string);
    }

    return;
  }
}

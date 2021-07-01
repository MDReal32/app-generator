import { spawn } from "cross-spawn";

export const executeCommand = (cmd: string, root: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const splitCommand = cmd.split(" ");
    const child = spawn(splitCommand[0], splitCommand.slice(1), { stdio: "inherit", cwd: root });
    child.on("exit", () => {
      resolve();
    });
    child.on("error", err => {
      reject(err);
    });
  });

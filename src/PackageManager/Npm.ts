import { PackageManager } from "./PackageManager";

export class Npm extends PackageManager {
  init() {
    return `npm init --yes`;
  }

  install() {
    return `npm install`;
  }

  save(...modules: string[]) {
    return `npm install ${modules.join(" ")}`;
  }

  saveDev(...modules: string[]) {
    return `npm install ${modules.join(" ")} --save-dev`;
  }

  getPackageManager() {
    return "npm";
  }
}

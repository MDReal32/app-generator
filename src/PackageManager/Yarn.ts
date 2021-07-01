import { PackageManager } from "./PackageManager";

export class Yarn extends PackageManager {
  init() {
    return `yarn init -y`;
  }

  install() {
    return `yarn install`;
  }

  save(...modules: string[]) {
    return `yarn add ${modules.join(" ")}`;
  }

  saveDev(...modules: string[]) {
    return `yarn add --dev ${modules.join(" ")}`;
  }

  getPackageManager() {
    return `yarn`;
  }
}

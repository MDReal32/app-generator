import { execSync } from "child_process";
import { Npm } from "./Npm";
import { PackageManager } from "./PackageManager";
import { Yarn } from "./Yarn";

export const getPackageManager = (): PackageManager => {
  try {
    execSync("yarn -v", { stdio: "ignore" });
    return new Yarn();
  } catch (e) {
    return new Npm();
  }
};

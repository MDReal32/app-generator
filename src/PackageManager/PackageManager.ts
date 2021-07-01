export class PackageManager {
  constructor() {}

  init(): string {
    throw new Error();
  }

  install(): string {
    throw new Error();
  }

  save(...modules: string[]): string {
    throw new Error();
  }

  saveDev(...modules: string[]): string {
    throw new Error();
  }

  log() {
    throw new Error();
  }

  getPackageManager(): string {
    throw new Error();
  }
}

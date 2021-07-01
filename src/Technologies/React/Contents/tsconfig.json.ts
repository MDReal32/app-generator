import { IConfig } from "../../../config";

export const getContent = (config: IConfig) => {
  return `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "commonjs",
    "lib": ["ES6", "ES2015", "ESNext"],
    "outDir": "lib",
    "rootDir": "src",
    "strict": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "importHelpers": true,
    "removeComments": true
  },
  "exclude": ["node_modules", "lib", "test", "templates"]
}
`;
};

import { Bundlers, CSSPreProcessors, Engines, Frameworks, Technologies } from "../enums";

export type Author = `${string}` | `${string} <${string}>` | `${string} <${string}> (${string})`;

export interface IConfig {
  root: string;
  name: string;
  description: string;
  author: Author;
  technology: Technologies;
  framework?: Frameworks;
  engine?: Engines;
  cssPreprocessor?: CSSPreProcessors;
  vueVersion?: 2 | 3;
  ssr?: boolean;
  bundler?: Bundlers;
  typescript?: boolean;
}

export type Config = Partial<IConfig>;

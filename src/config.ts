import { prompts } from "inquirer";
import { basename, dirname, resolve } from "path";
import { confirmQuestion, listQuestion, question } from "./Questions";
import {
  Bundlers,
  CSSPreProcessors,
  Engines,
  Frameworks,
  Questions,
  Technologies
} from "./typescript/enums";
import { IConfig } from "./typescript/interfaces";

export enum Frameworks {
  Express = "expressjs",
  NestJS = "nestjs"
}

export enum CSSPreProcessors {
  Plain = "plain",
  Less = "less",
  Stylus = "stylus",
  Compass = "compass",
  Sass = "sass"
}

export enum Engines {
  NoView = "no-view",
  EJS = "ejs",
  HBS = "hbs",
  HJS = "hjs",
  Jade = "jade",
  Twig = "twig",
  Vash = "vash",
  Hogan = "hogan",
  Pug = "pug"
}

export interface IConfig {
  technology: Technologies;
  bundler: Bundlers;
  framework: Frameworks;
  ssr: boolean;
  engine: Engines;
  cssEngine: CSSPreProcessors;
  vueVersion: 2 | 3;
  ts: boolean;
}

export const getConfig = async () => {
  const answers: IConfig = await prompt([
    {
      name: "technology",
      message: "Which technology you want use?",
      type: "list",
      choices: Object.keys(Technologies)
    }
  ]);

  // @ts-ignore
  answers.technology = Technologies[answers.technology];

  /// <Express>
  if (answers.technology === Technologies.Express) {
    const Framework: IConfig = await prompt({
      name: "framework",
      message: "Which Framework do you want use?",
      type: "list",
      choices: Object.keys(Frameworks)
    });

    // @ts-ignore
    answers.framework = Frameworks[Framework.framework];
  }

  const isExpress =
    answers.technology === Technologies.Express && answers.framework === Frameworks.Express;

  if (isExpress) {
    const Engine: IConfig = await prompt({
      name: "engine",
      message: "Which Engine do you want to use MVC Model?",
      type: "list",
      choices: Object.keys(Engines)
    });

    const CssEngine: IConfig = await prompt({
      name: "cssEngine",
      message: "Which CSS Preprocessor do you want to use?",
      type: "list",
      choices: Object.keys(CSSPreProcessors)
    });

    answers.engine = Engine.engine;
    answers.cssEngine = CssEngine.cssEngine;
  }
  /// </Express>

  // /// <Vue>
  // if (answers.technology === Technologies.Vue) {
  //   const VueVersions: IConfig = await prompt({
  //     name: "vueVersion",
  //     message: "Which Vue Version do you want?",
  //     type: "list",
  //     choices: ["2", "3"]
  //   });
  //
  //   const SSR: IConfig = await prompt({
  //     name: "ssr",
  //     message: "Do you want SSR App?",
  //     type: "confirm"
  //   });
  //
  //   // @ts-ignore
  //   answers.vueVersion = parseInt(VueVersions.vueVersion);
  //   answers.ssr = SSR.ssr;
  //   answers.bundler = Bundlers.Webpack;
  // }
  //
  // if (answers.vueVersion === 3) {
  //   const userBundler: IConfig = await prompt({
  //     name: "bundler",
  //     message: "Which bundler you want use?",
  //     type: "list",
  //     choices: Object.keys(Bundlers)
  //   });
  //
  //   // @ts-ignore
  //   answers.bundler = Bundlers[userBundler.bundler];
  // }
  // /// </Vue>

  /// <React>
  if (answers.technology === Technologies.React) {
    const userBundler: IConfig = await prompt({
      name: "bundler",
      message: "Which bundler you want use?",
      type: "list",
      choices: Object.keys(Bundlers)
    });

    const SSR: IConfig = await prompt({
      name: "ssr",
      message: "Do you want SSR App?",
      type: "confirm"
    });

    // @ts-ignore
    answers.bundler = Bundlers[userBundler.bundler];
    answers.ssr = SSR.ssr;
  }
  /// </React>

  /// <Typescript>
  if (answers.framework !== Frameworks.Express) {
    const TypeScript: IConfig = await prompt({
      name: "ts",
      message: "Do you want use TypeScript?",
      type: "confirm"
    });

    answers.ts = TypeScript.ts;
  }
  /// </Typescript>

  return answers;
};

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

export const getConfig = async (root: string): Promise<IConfig> => {
  const base = await question(Questions.ROOT, root);
  let baseDir = resolve(root, base);
  let projectName = await question(Questions.PROJ_NAME, basename(baseDir));
  const description = await question(Questions.DESCRIPTION, "");
  const author = await question(Questions.AUTHOR, "");
  const tech = await listQuestion<keyof typeof Technologies>(
    Questions.SELECT_TECH,
    ...Object.keys(Technologies)
  );

  if (projectName === ".") {
    projectName = basename(baseDir);
    baseDir = dirname(baseDir);
  }

  const config: IConfig = {
    root: baseDir,
    name: projectName,
    description,
    author,
    technology: Technologies[tech]
  };

  /// <Express>
  if (config.technology === Technologies.Express) {
    const framework = await listQuestion<keyof typeof Frameworks>(
      Questions.EXPRESS_FRAMEWORK,
      ...Object.keys(Frameworks)
    );

    config.framework = Frameworks[framework];
  }

  const isExpress =
    config.technology === Technologies.Express && config.framework === Frameworks.Express;

  if (isExpress) {
    const engine = await listQuestion<keyof typeof Engines>(
      Questions.EXPRESS_HTML_ENGINE,
      ...Object.keys(Engines)
    );
    const cssPreProcessor = await listQuestion<keyof typeof CSSPreProcessors>(
      Questions.EXPRESS_CSS_PREPROCESSOR,
      ...Object.keys(CSSPreProcessors)
    );

    config.engine = Engines[engine];
    config.cssPreprocessor = CSSPreProcessors[cssPreProcessor];
  }
  /// </Express>

  /// <Vue>
  if (config.technology === Technologies.Vue) {
    config.vueVersion = await listQuestion<2 | 3>(Questions.VUE_VERSION, 2, 3);
    config.ssr = await confirmQuestion(Questions.SSR_APP);
    config.bundler = Bundlers.Webpack;
  }

  if (config.vueVersion && parseInt(config.vueVersion.toString()) === 3) {
    const bundler = await listQuestion<keyof typeof Bundlers>(
      Questions.BUNDLER,
      ...Object.keys(Bundlers)
    );
    config.bundler = Bundlers[bundler];
  }
  /// </Vue>

  /// <React>
  if (config.technology === Technologies.React) {
    const bundler = await listQuestion<keyof typeof Bundlers>(
      Questions.BUNDLER,
      ...Object.keys(Bundlers)
    );
    config.bundler = Bundlers[bundler];
    config.ssr = await confirmQuestion(Questions.SSR_APP);
  }
  /// </React>

  /// <Typescript>
  if (config.framework !== Frameworks.Express) {
    config.typescript = await confirmQuestion(Questions.TYPESCRIPT);
  }
  /// </Typescript>

  return config;
};


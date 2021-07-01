import { IConfig } from "../../../config";

export const getContent = (config: IConfig) => {
  return JSON.stringify(
    {
      arrowParens: "avoid",
      bracketSpacing: true,
      embeddedLanguageFormatting: "auto",
      htmlWhitespaceSensitivity: "css",
      insertPragma: false,
      jsxBracketSameLine: false,
      jsxSingleQuote: false,
      printWidth: 100,
      proseWrap: "preserve",
      quoteProps: "consistent",
      requirePragma: false,
      semi: true,
      singleQuote: false,
      tabWidth: 2,
      trailingComma: "none",
      useTabs: false,
      vueIndentScriptAndStyle: false
    },
    null,
    2
  );
};

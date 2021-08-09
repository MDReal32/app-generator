import { writeFileSync } from "fs";
import {
  Bundlers,
  CSSPreProcessors,
  Engines,
  Questions,
  Technologies
} from "../src/typescript/enums";

const questions = `
# Questions

\`${Questions.ROOT}\`
  - Project's root

\`${Questions.DESCRIPTION}\`
  - Project's description

\`${Questions.PROJ_NAME}\`
  - Project's name

\`${Questions.SELECT_TECH}\`
${Object.keys(Technologies)
  .map(t => `  - ${t}`)
  .join("\n")}

#### If selected Express
\`${Questions.EXPRESS_FRAMEWORK}\`
  - Express (Pure with express-generator)
  - NestJS

\`${Questions.EXPRESS_HTML_ENGINE}\`
${Object.keys(Engines)
  .map(t => `  - ${t}`)
  .join("\n")}

\`${Questions.EXPRESS_CSS_PREPROCESSOR}\`
${Object.keys(CSSPreProcessors)
  .map(t => `  - ${t}`)
  .join("\n")}

#### If selected NestJS
\`${Questions.TYPESCRIPT}\`
${[true, false].map(t => `  - ${t ? "Yes" : "No"}`).join("\n")}

#### If selected React
\`${Questions.BUNDLER}\`
${Object.keys(Bundlers)
  .map(t => `  - ${t}`)
  .join("\n")}

\`${Questions.SSR_APP}\`
${[true, false].map(t => `  - ${t ? "Yes" : "No"}`).join("\n")}

\`${Questions.TYPESCRIPT}\`
${[true, false].map(t => `  - ${t ? "Yes" : "No"}`).join("\n")}

`.trim();

writeFileSync(`${process.cwd()}/QUESTIONS.md`, questions);

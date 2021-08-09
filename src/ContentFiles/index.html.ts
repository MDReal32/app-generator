import { IConfig } from "../typescript/interfaces";
import { Technologies } from "../typescript/enums";

export const getContent = (config: IConfig) => {
  const ext =
    (config.typescript ? "ts" : "js") + (config.technology === Technologies.React ? "x" : "");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    <script type="module" src="/src/entry-client.${ext}"></script>
  </body>
</html>
`;
};

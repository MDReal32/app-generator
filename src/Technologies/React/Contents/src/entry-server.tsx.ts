import { IConfig } from "../../../../config";

export const getContent = (config: IConfig) => {
  return `import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouterContext } from "react-router";
import { StaticRouter } from "react-router-dom";
import { App } from "./App";

export function render(url: string, context: StaticRouterContext): string {
  return renderToString(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );
}
`;
};

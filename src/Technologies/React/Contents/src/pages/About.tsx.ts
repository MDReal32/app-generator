import { IConfig } from "../../../../../config";

export const getContent = (config: IConfig) => {
  return `import React from "react";

export default function About() {
  return <h1>About</h1>;
}
`;
};

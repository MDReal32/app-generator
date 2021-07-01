import { IConfig } from "../../../../../config";

export const getContent = (config: IConfig) => {
  return `import React from "react";

export default function Home() {
  return <h1>Home</h1>;
}
`;
};

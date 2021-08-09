export const getContent = () => {
  return `import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from "vue-router";

// @ts-ignore
const pages: Record<string, any> = import.meta.glob("./pages/*.vue");

const routes = Object.keys(pages).map(path => {
  const name = path.match(/\.\\/pages(.*)\\.vue$/)![1].toLowerCase();
  return {
    path: name === "/home" ? "/" : name,
    component: pages[path]
  };
});

export function createRouter() {
  return _createRouter({
    // @ts-ignore
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  });
}

`;
};

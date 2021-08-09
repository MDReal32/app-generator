export const getContent = () => {
  return `import App from "./App.vue";
import { createSSRApp, createApp as createClientApp } from "vue";
import { createRouter } from "./router";

export function createApp() {
  const app = import.meta.env.SSR ? createSSRApp(App) : createClientApp(App);
  const router = createRouter();
  app.use(router);
  return { app, router };
}
`;
};

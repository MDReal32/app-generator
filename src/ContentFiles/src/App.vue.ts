import { IConfig } from "../../typescript/interfaces";

export const getContent = (config: IConfig) => {
  return `<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script${config.typescript ? ' lang="ts"' : ""}>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App"
})
</script>

<style></style>
`;
};

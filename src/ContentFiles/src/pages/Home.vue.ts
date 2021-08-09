import { IConfig } from "../../../typescript/interfaces";

export const getContent = (config: IConfig) => {
  return `
<template>
  <div>Home Page</div>
</template>

<script${config.typescript ? ' lang="ts"' : ""}>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home"
})
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>
`.trimStart();
};

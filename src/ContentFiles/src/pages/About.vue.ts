import { IConfig } from "../../../typescript/interfaces";

export const getContent = (config: IConfig) => {
  return `
<template>
  <div>About Page</div>
</template>

<script${config.typescript ? ' lang="ts"' : ""}>
import { defineComponent } from "vue";

export default defineComponent({
  name: "About"
})
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>
`.trimStart();
};

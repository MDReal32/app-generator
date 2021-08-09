export const getContent = () => {
  return `declare module "*.vue" {
  import Vue from 'vue';
  export default Vue;
}`;
};

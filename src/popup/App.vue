<template>
  <div>
    <hello-world /><br />
    {{ test }}
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "App",
  components: { HelloWorld },
  mounted() {
    browser.tabs.executeScript({
      file: "js/content-script.js",
    });
  },
  computed: {
    test() {
      return this.$store.state.error;
    },
  },
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>

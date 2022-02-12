<template>
  <div>
    <hello-world /><br />
    <p>type: {{ message.type }}</p>
    <p>payload: {{ message.payload }}</p>
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
    message() {
      return this.$store.state.message;
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

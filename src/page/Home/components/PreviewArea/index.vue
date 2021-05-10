<template>
  <div class="iframe-wrapper">
    <iframe
      id="preview-iframe"
      width="375"
      height="667"
      scrolling="no"
      src="http://172.16.20.60:3000/preview"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  setup() {

    return {
      
    };
  },
};
</script>

<style lang="stylus" scoped>
.iframe-wrapper {
  margin: 10px;
}
</style>
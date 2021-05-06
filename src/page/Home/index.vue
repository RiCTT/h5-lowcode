<template>
  <div class="view-wrapper">
    <div class="template-wrapper">
      <span>模板区</span>
    </div>
    <div class="prev-wrapper">
      <div class="iframe-wrapper">
        <iframe width="375" height="667" scrolling="no" src="http://172.16.20.60:3000/preview" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  },
};
</script>

<style lang="stylus" scoped>
.iframe-wrapper {
  display: inline-block;
  width: 378px;
  height: 669px;
  border: 1px solid red;
}
.view-wrapper {
  display: flex;
  height: 100vh;
  min-height: 667px;
}

.template-wrapper {
  width: 300px;
  height: 100%;
  border: 1px solid skyblue;
  box-sizing: border-box;
}

.prev-wrapper {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid yellow;
}
</style>
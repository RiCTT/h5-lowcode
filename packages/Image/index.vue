<template>
  <a class="low-image" :target="target">
    <img :src="src" alt="#">
  </a>
</template>

<script>
export default {
  name: 'LowImage',
  props: {
    href: {
      type: String,
      default: '#app'
    },
    target: {
      type: String,
      default: '_blank'
    },
    src: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.low-image {
  display: block;
  width: 100%;
  
  img {
    display: block;
    width: 100%;
  }
}
</style>
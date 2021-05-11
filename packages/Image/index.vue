<template>
  <a class="low-image" :href="href" :target="target">
    <img :src="src" alt="图片" :class="{ 'image-place': !loaded }" @load="handleImageLoaded">
  </a>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'LowImage',
  props: {
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '__blank'
    },
    src: {
      type: String,
      default: ''
    }
  },
  setup() {
    const data = reactive({
      loaded: false
    })
    const handleImageLoaded = (e) => {
      data.loaded = true
    }

    const dataAsRefs = toRefs(data)

    return {
      ...dataAsRefs,
      handleImageLoaded
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

  .image-place {
    width: 85%;
    height: 100px;
    border-radius: 8px;
    margin: 10px auto;
    background-color: #f2f2f2;
  }
}
</style>
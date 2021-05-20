<template>
  <a class="low-image" :href="href" :target="target">
    <img :src="src" alt="图片" :class="{ 'image-place': !loaded }" @load="handleImageLoaded">
  </a>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { InjectPropsListMap } from './index'


export default {
  props: {
    ...InjectPropsListMap
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

<style>

</style>
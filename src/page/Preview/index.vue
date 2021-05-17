<template>
  <!-- 单独做成一个业务组件or路由 -->
  <div class="preview">
    <component v-for="item in componentList" v-bind="{ ...item.attrs, ...item.formData }" :key="item.name" :is="item.name"></component>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const componentList = ref([])

    window.addEventListener("message", (message) => {
      console.log('Receive Message: ', message)
      const data = JSON.parse(message.data)
      componentList.value = data
      console.log(data)
    }, false);

    return {
      componentList,
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
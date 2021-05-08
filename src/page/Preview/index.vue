<template>
  <!-- 单独做成一个业务组件or路由 -->
  <div class="preview" @drop="onDrop" @dragover="onDragOver">
    <component v-for="item in componentList" :key="item.name" :is="item.name"></component>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const componentList = ref([])
    const onDragStart = (e) => {
      console.log('start')
      e.dataTransfer.setData("Text", 123);
    }
    const onDragOver = (e) => {
      e.preventDefault()
      console.log('onDragOver')
    }
    const onDrop = (e) => {
      e.preventDefault()
      var data=e.dataTransfer.getData("Text");
      console.log(data)
      console.log('drop')
    }
    return {
      componentList,
      onDragStart,
      onDrop,
      onDragOver
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
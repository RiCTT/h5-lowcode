<template>
  <div>
    parent count: 
    {{count}}
    <div @click="increate">增加</div>
    <Child />
  </div>
</template>

<script>
import Child from './child.vue'
import { state } from './store'
export default {
  components: {
    Child
  },
  setup() {
    let count = state.count
    const increate = () => {
      count.value++
    }
    return {
      count,
      increate
    }
  }
}
</script>

<style>

</style>
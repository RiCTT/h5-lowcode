<template>
  <div>
    count: 
    {{count}}
    <div @click="childCreate">子增加</div>
  </div>
</template>

<script>
import { toRefs, toRef, reactive } from 'vue'
import { state } from './store'
export default {
  setup() {
    // let { count } = toRefs(state)
    let { count } = state
    const childCreate = () => {
      count.value++
    }
    return {
      // ...toRefs(state)
      count,
      childCreate
    }
  }
}
</script>

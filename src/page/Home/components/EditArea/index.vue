<template>
  <div class="edit-box" @drop.prevent="onDrop" @dragover.prevent="onDragOver">
    <div class="component-wrapper" :class="{ active: item.uid === currentSelectComponent.uid }" v-for="item in editComponentList" :key="item.uid + '-' + item.name" @click.prevent="handleEditComponentClick(item)">
      <component v-bind="item.attrs" :is="item.name"></component>
    </div>
  </div>
</template>

<script>
import { state } from '../../store/index.js'
import { watch, ref, reactive } from 'vue'
import LowInput from '@/components/Input/index.vue'

let uid = 0

export default {
  components: {
    LowInput
  },
  setup() {
    const { components, editComponentList, currentSelectComponent } = state

    const onDrop = (e) => {
      const componentName = e.dataTransfer.getData("Text");
      const componentProps = components.value.find(e => e.name === componentName).properies
      const attrs = {}

      Object.keys(componentProps).forEach(index => {
        const item = componentProps[index]
        const { key } = item
        console.log(item)
        attrs[key] = item.value
      })

      editComponentList.value.push({ uid: ++uid, name: componentName, props: componentProps, attrs })
    }

    const onDragOver = (e) => {}

    const handleEditComponentClick = (item) => {
      currentSelectComponent.value = item
    }

    watch(editComponentList.value, (val) => {
      console.log('change  ddd ')
      const iframe = document.getElementById('preview-iframe').contentWindow
      const data = JSON.stringify(val)
      iframe.postMessage(data)
    })

    return {
      onDrop,
      onDragOver,
      handleEditComponentClick,
      ...state
    } 
  } 
}
</script>

<style lang="stylus" scoped>
.edit-wrapper {
  width: 400px;
  height: 100vh;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  .edit-box {
    width: 375px;
    height: 667px;
    margin: 0 auto;
    margin-top: 10px;
    border: 1px solid #ddd;
  }
}

.component-wrapper {
  &.active {
    border: 2px solid skyblue;
  }
}
</style>
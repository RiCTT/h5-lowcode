<template>
  <div class="edit-box" @drop.prevent="onDrop" @dragover.prevent="onDragOver">
    <div class="component-wrapper" 
      :class="{ active: item.uid === currentSelectComponent.uid }" 
      v-for="item in editComponentList" :key="item.uid + '-' + item.name" 
      @click.prevent="handleEditComponentClick(item)"
    >
      <component v-bind="{ ...item.tplData }" :is="item.name"></component>
    </div>
  </div>
</template>

<script>
import { state } from '../../store/index.js'
import { watch } from 'vue'

let uid = 0

export default {
  setup() {
    const { templateList, editComponentList, currentSelectComponent } = state
    const onDrop = (e) => {
      const componentName = e.dataTransfer.getData("Text");
      const dragComponent = templateList.value.find(e => e.name === componentName)
      let { tplProps, tplData } = dragComponent
      // 解绑每个模板组件实例关系
      tplProps = JSON.parse(JSON.stringify(tplProps))
      tplData = JSON.parse(JSON.stringify(tplData))
      editComponentList.value.push({ uid: ++uid, ...dragComponent, tplProps, tplData })
    }

    const onDragOver = (e) => {}

    const handleEditComponentClick = (item) => {
      currentSelectComponent.value = item
    }

    watch(editComponentList.value, (val) => {
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
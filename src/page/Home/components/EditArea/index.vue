<template>
  <div 
    class="edit-box"
    @dragenter="onDragEnter"
    @drop.prevent.stop="onDrop"
    @dragover.prevent.stop="onDragOver"
    >
    <div class="component-wrapper"
      v-for="item in editComponentList" :key="item.uid + '-' + item.name"
      :class="{ active: item.uid === currentSelectComponent.uid }"
      @click.prevent="handleEditComponentClick(item)"
      draggable="true"
      @dragstart.stop="onDragStart(item, $event)"
    >
      <component v-bind="{ ...item.tplData }" :is="item.name"></component>
    </div>
  </div>
</template>

<script>
import { state } from '../../store/index.js'
import { watch, ref } from 'vue'
import clone from '@/utils/clone'

const DROP_TYPE = {
  CREATE: 10,
  SWITCH_POSITION: 20
}
let uid = 0

export default {
  setup() {
    const { templateList, editComponentList, currentSelectComponent, dragItem } = state
    // 处理enter、leave相关逻辑的标记（父元素监听enter事件，移动到子元素的时候，会触发leave事件，导致重复执行）
    const hasLeave = ref(true)

     window.addEventListener('dragend', (e) => {
      hasLeave.value = true
    })

    const onDragStart = (item, e) => {
      item.dropType = DROP_TYPE.SWITCH_POSITION
      dragItem.value = item
    }

    const onDragEnter = (e) => {
      if (!hasLeave.value) return 
      hasLeave.value = false
      const { dropType: type, name } = dragItem.value
      const dropType = Number(type)
      if (dropType === DROP_TYPE.CREATE) {
        const componentName = name
        const dragComponent = templateList.value.find(e => e.name === componentName)
        let { tplProps, tplData } = dragComponent
        // 解绑每个模板组件实例关系
        // tplProps = JSON.parse(JSON.stringify(tplProps))
        // tplData = JSON.parse(JSON.stringify(tplData))
        tplProps = clone(tplProps)
        tplData = clone(tplData)
        const data = { uid: ++uid, ...dragComponent, tplProps, tplData }
        editComponentList.value.push(data)
        currentSelectComponent.value = data
      }
      if (dropType === DROP_TYPE.SWITCH_POSITION) {
        console.log(e)
      }
    }
    const onDragEnd = (e) => {
      hasLeave.value = true
    }

    const onDrop = (e) => {
      hasLeave.value = true
    }

    const onDragOver = (e) => {
      console.log('dragover !')
    }

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
      onDragStart,
      onDragEnter,
      onDragEnd,
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
    overflow: auto;
  }
}

.component-wrapper {
  position: relative;
  border: 2px solid transparent;

  &.active {
    border: 2px solid skyblue;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    cursor: pointer;
  }
}
</style>

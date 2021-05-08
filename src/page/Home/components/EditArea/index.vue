<template>
  <div class="edit-box" @drop.prevent="onDrop" @dragover.prevent="onDragOver">
    <component v-for="item in editComponentList" v-bind="item.attrs" @click="handleEditComponentClick(item)" :key="item.name" :is="item.name"></component>
  </div>
</template>

<script>
import useData from '../../composables/useData.js'

let uid = 0

export default {
  setup() {
    const { components, editComponentList, currentSelectComponent, updateCurrentSelectComponent } = useData

    const onDrop = (e) => {
      const componentName = e.dataTransfer.getData("Text");
      const componentProps = components.value.find(e => e.name === componentName).properies
      const attrs = {}

      Object.keys(componentProps).forEach(index => {
        const item = componentProps[index]
        const { key } = item
        console.log(item)
        attrs[key] = ''
      })

      editComponentList.value.push({ uid: ++uid, name: componentName, props: componentProps, attrs })
    }

    const onDragOver = (e) => {
      console.log('onDragOver')
    }

    const handleEditComponentClick = (item) => {
      console.log(item)
      updateCurrentSelectComponent(item)
    }
    return {
      onDrop,
      onDragOver,
      handleEditComponentClick,
      currentSelectComponent,
      editComponentList
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
</style>
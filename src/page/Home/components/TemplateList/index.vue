<template>
  <div class="component-list">
    <div draggable="true" :data-id="item.name" @dragstart="onDragStart" class="component-item" v-for="item in templateList" :key="item.name">
      <span class="item-thumbnail"></span>
      <span class="item-name">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { state } from '../../store/index.js'

export default {
  setup() {
    const { templateList } = state
    const onDragStart = (e) => {
      const { id } = e.target.dataset
      e.dataTransfer.setData('Text', id)
    }
    return {
      templateList,
      onDragStart
    }
  }
}
</script>

<style lang="stylus" scoped>
.component-list {
  display: flex;
  padding: 10px 15px;

  .component-item {
    width: 80px;
    background-color: #ddd;
    cursor: move;
    margin-right: 20px;

    .item-thumbnail {
      display: block;
      width: 80%;
      height: 40px;
      margin: 4px auto;
      background-color: #f2f2f2;
      box-sizing: border-box;
    }

    .item-name {
      display: block;
      text-align: center;
      color: #999;
    }
  }
}
</style>

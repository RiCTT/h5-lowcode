<template>
<TestForm />
  <div class="view-wrapper">
    <div class="template-wrapper wrapper-borderline">
      <h4 class="block-header template-header">模板区</h4>
      <div class="component-list">
        <div draggable="true" :data-id="item.name" @dragstart="onDragStart" class="component-item" v-for="item in components" :key="item.name">
          <span class="item-thumbnail"></span>
          <span class="item-name">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="edit-wrapper wrapper-borderline">
      <h4 class="block-header">编辑区</h4>
      <EditArea />
    </div>
    <div class="prev-wrapper wrapper-borderline">
      <h4 class="block-header">预览区</h4>
      <PreviewArea />
    </div>
    <div class="props-wrapper">
      <h4 class="block-header">属性区</h4>
      <PropsArea />
    </div>
  </div>
</template> 

<script>
import { ref } from "vue";
import useData from './composables/useData.js'
import EditArea from './components/EditArea/index.vue'
import PropsArea from './components/PropsArea/index.vue'
import PreviewArea from './components/PreviewArea/index.vue'
import TestForm from '@/template/Form/index.vue'

export default {
  name: "App",
  components: {
    EditArea,
    PropsArea,
    PreviewArea,
    TestForm
  },
  setup() {
    const { components } = useData
    const onDragStart = (e) => {
      const { id } = e.target.dataset
      e.dataTransfer.setData("Text", id);
    }
    
    return {
      components,
      onDragStart,
    };
  },
};
</script>

<style lang="stylus" scoped>
.view-wrapper {
  display: flex;
  min-height: 667px;
  height: 100vh;
  .wrapper-borderline {
    border-right: 1px solid #f2f2f2;
  }
}

.block-header {
  border-bottom: 1px solid #f2f2f2;
  text-align: center;
  line-height: 3;
}

.template-wrapper {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
}

.edit-wrapper {
  flex: 1;
  min-width: 400px;
  height: 100%;
}

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

.props-wrapper {
  flex: 1;
  overflow: hidden;
  border-right: 1px solid #f2f2f2;
}
</style>
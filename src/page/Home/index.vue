<template>
  <div class="view-wrapper">
    <div class="template-wrapper">
      <h4 class="block-header template-header">模板区</h4>
      <div class="component-list">
        <div draggable="true" :data-id="item.name" @dragstart="onDragStart" class="component-item" v-for="item in components" :key="item.name">
          <span class="item-thumbnail"></span>
          <span class="item-name">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="edit-wrapper">
      <h4 class="block-header">编辑区</h4>
      <EditArea />
    </div>
    <!-- <div class="prev-wrapper">
      <div class="iframe-wrapper">
        <iframe
          @drop="onDrop"
          @dragover="onDragOver"
          width="375"
          height="667"
          scrolling="no"
          src="http://172.16.20.60:3000/preview?uid=123"
          frameborder="0"
        ></iframe>
      </div>
    </div> -->
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

export default {
  name: "App",
  components: {
    EditArea,
    PropsArea
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
.iframe-wrapper {
  display: inline-block;
  width: 378px;
  height: 669px;
  border: 1px solid red;
}

.view-wrapper {
  display: flex;
  height: 100vh;
  min-height: 667px;
}

.block-header {
  border-bottom: 1px solid #f2f2f2;
  text-align: center;
  line-height: 3;
}

.template-wrapper {
  width: 300px;
  height: 100%;
  border: 1px solid skyblue;
  box-sizing: border-box;

}

.prev-wrapper {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid yellow;
}

.component-list {
  display: flex;
  padding: 10px 15px;

  .component-item {
    width: 80px;
    background-color: #ddd;
    cursor: move;

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
  width: 400px;
  height: 100vh;
  border: 1px solid #f2f2f2;
  .props-list {
    
  }
}
</style>
<template>
  <div class="view-wrapper">
    <div class="template-wrapper wrapper-borderline">
      <h4 class="block-header template-header">模板区</h4>
      <TemplateList />
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
import EditArea from './components/EditArea/index.vue'
import PropsArea from './components/PropsArea/index.vue'
import PreviewArea from './components/PreviewArea/index.vue'
import TemplateList from './components/TemplateList/index.vue'

export default {
  name: "App",
  components: {
    EditArea,
    PropsArea,
    PreviewArea,
    TemplateList,
  },
  setup() {
    return {
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


.props-wrapper {
  flex: 1;
  overflow: hidden;
  border-right: 1px solid #f2f2f2;
}
</style>
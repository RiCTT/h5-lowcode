<template>
  <div class="props-list-wrapper">
    <div class="props-item">
      <div class="item-wrapper" v-for="(item, key) in currentSelectComponent.tplProps" :key="key">
        <component :is="getComponentName(item.ui)" v-model="currentSelectComponent.tplData[key]">
          {{key}}
          <template v-if="item.ui === 'select'">
            <el-option label="1" value="1"></el-option>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch, toRefs, ref } from 'vue'
import { state } from "../../store/index.js";
import SysSelect from '@/components/Select/index.vue'
import SysInput from '@/components/Input/index.vue'
import FormRender from '../../../../../packages/FormRender/index.jsx'
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus'

export default {
  components: {
    SysSelect,
    SysInput,
    FormRender,
    [ElForm.name]: ElForm, 
    [ElFormItem.name]: ElFormItem,
    [ElInput.name]: ElInput,
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption
  },
  setup() {
    const { editComponentList, currentSelectComponent } = state;

    const handleOnChange = (data) => {
      const { uid } = currentSelectComponent.value
      const target = editComponentList.value.find(item => {
        return item.uid === uid
      })
      target.formData = { ...data }
    }

    const getComponentName = (ui) => {
      console.log(ui)
      switch(ui) {
        case 'input':
          return 'el-input'
        case 'select':
          return 'el-select'
        default:
          return 'el-input'
      }
    }
    return {
      handleOnChange,
      editComponentList,
      currentSelectComponent,
      getComponentName
    };
  },
};
</script>

<style lang="stylus" scoped>
.props-list-wrapper {
  width: 100%;
  padding: 15px 25px;
  box-sizing: border-box;
}

.props-item {
  // display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;

  .prop-name {
    min-width: 70px;
    font-weight: inherit;
    margin-right: 10px;
  }
  .prop-component {
    flex: 1;
  }
}
</style>
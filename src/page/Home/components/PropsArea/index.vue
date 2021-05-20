<template>
  <div class="props-list-wrapper">
    <div class="props-item">
      {{currentSelectComponent && currentSelectComponent.tplProps}}
    </div>
  </div>
</template>

<script>
import { reactive, watch, toRefs, ref } from 'vue'
import { state } from "../../store/index.js";
import SysSelect from '@/components/Select/index.vue'
import SysInput from '@/components/Input/index.vue'
import FormRender from '../../../../../packages/FormRender/index.jsx'


export default {
  components: {
    SysSelect,
    SysInput,
    FormRender
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

    return {
      handleOnChange,
      editComponentList,
      currentSelectComponent,
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
  display: flex;
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
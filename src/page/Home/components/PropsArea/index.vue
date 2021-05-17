<template>
  <div class="props-list-wrapper">
    <div class="props-item">
      <FormRender
        v-if="currentSelectComponent && currentSelectComponent.schema"
        :schema="currentSelectComponent.schema"
        :formData="currentSelectComponent.formData"
        :onChange="handleOnChange"
      />
    </div>
    <!-- <div
      class="props-item"
      v-for="item in currentSelectComponent.props"
      :key="item.key"
    >
      <template v-if="item.type === 'select'">
        <span class="prop-name">{{ item.name }}</span>
        <span class="prop-component">
          <SysSelect :key="item.key" v-model="currentSelectComponent.attrs[item.key]" :options="item.options" />
        </span>
      </template>
      <template v-else>
        <span class="prop-name">{{ item.name }}</span>
        <span class="prop-component">
          <SysInput :key="item.key" v-model="currentSelectComponent.attrs[item.key]" />
        </span>
      </template>
    </div> -->
  </div>
</template>

<script>
import { reactive, watch, toRefs } from 'vue'
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

    const handleOnChange = (val) => {
      console.log(val)
      // console.log(val)
      console.log('!!! change !!! ')
      console.log(currentSelectComponent.value)
      // console.log(currentSelectComponent)
      // currentSelectComponent.value.formData = val
      // currentSelectComponent.formData = val
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
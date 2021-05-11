<template>
  <div class="props-list-wrapper">
    <div
      class="props-item"
      v-for="item in currentSelectComponent.props"
      :key="item.key"
    >
      <template v-if="item.type === 'select'">
        <span class="prop-name">{{ item.name }}</span>
        <span class="prop-component">
          <LowSelect :key="item.key" v-model="currentSelectComponent.attrs[item.key]" :options="item.options" />
        </span>
      </template>
      <template v-else>
        <span class="prop-name">{{ item.name }}</span>
        <span class="prop-component">
          <LowInput :key="item.key" v-model="currentSelectComponent.attrs[item.key]" />
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import { reactive, watch, toRefs } from 'vue'
import { state } from "../../store/index.js";
import LowSelect from '@/components/Select/index.vue'
import LowInput from '@/components/Input/index.vue'

export default {
  components: {
    LowSelect,
    LowInput
  },
  setup() {
    const { editComponentList, currentSelectComponent } = state;
    const data = toRefs(reactive({
      currentSelect: '',
      options: [
        { label: '1', value: 1},
        { label: '2', value: 2},
        { label: '3', value: 3}
      ]
    }))

    return {
      editComponentList,
      currentSelectComponent,
      ...data
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
<template>
  <div class="props-list-wrapper">
    <div
      class="props-item"
      v-for="item in currentSelectComponent.props"
      :key="item.key"
    >
      <template v-if="item.type === 'select'">
        <span class="prop-name">{{ item.name }}</span>
        <select>
          <option value="" v-for="o in item.options" :key="o.code">
            {{ o.message }}
          </option>
        </select>
      </template>
      <template v-else>
        <span class="prop-name">{{ item.name }}</span>
        <input type="text" v-model="currentSelectComponent.attrs[item.key]" />
      </template>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue'
import { state } from "../../store/index.js";

export default {
  setup() {
    const { editComponentList, currentSelectComponent } = state;

    return {
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
}

.props-item {
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;

  .prop-name {
    font-weight: inherit;
    margin-right: 10px;
  }
}
</style>
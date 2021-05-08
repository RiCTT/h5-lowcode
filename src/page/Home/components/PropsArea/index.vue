<template>
  <div class="props-list">
    {{currentSelectComponent}}
    <div
      class="props-item"
      v-for="item in currentSelectComponent.props"
      :key="item.key"
    >
      <template v-if="item.type === 'select'">
        <span>{{ item.name }}</span>
        <select>
          <option value="" v-for="o in item.options" :key="o.code">
            {{ o.message }}
          </option>
        </select>
      </template>
      <template v-else>
        <span>{{ item.name }}</span>
        <input type="text" v-model="currentSelectComponent.attrs[item.key]" />
      </template>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue'
import useData from "../../composables/useData.js";

export default {
  setup() {
    const {
      editComponentList,
      currentSelectComponent,
    } = useData;

    watch(currentSelectComponent, (val) => {
      console.log('current change')
      console.log(val)
    })

    return {
      editComponentList,
      currentSelectComponent,
    };
  },
};
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
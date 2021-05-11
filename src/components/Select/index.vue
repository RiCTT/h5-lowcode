<template>
  <el-select :modelValue="modelValue" @update:modelValue="handleUpdateModel">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import { ElSelect, ElOption } from 'element-plus';
export default {
  name: 'LowSelect',
  props: {
    modelValue: [String, Number, Array, Object],
    options: {
      type: Array,
      default: () => []
    },
  },
  setup(props, ctx) {
    return {
      handleUpdateModel(val) {
        console.log('change')
        ctx.emit('update:modelValue', val)
      }
    }
  },
  components: {
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption
  }
}
</script>

<style>

</style>
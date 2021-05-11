<template>
  <el-input :modelValue="modelValue" @update:modelValue="handleUpdateModel"></el-input>
</template>

<script>
import { ElInput } from 'element-plus';
export default {
  name: 'LowInput',
  components: {
    [ElInput.name]: ElInput
  },
  props: {
    modelValue: [String, Number, Array, Object]
  },
  setup(props, ctx) {
    const handleUpdateModel = (val) => {
      ctx.emit('update:modelValue', val)
    }
    return {
      handleUpdateModel
    }
  }
}
</script>

<style>

</style>
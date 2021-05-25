<template>
  <div>
    <el-input :modelValue="value" @input="handleInput" />
  </div>
</template>

<script>
import { ElInput, ElSelect, ElOption } from 'element-plus'
import { watch, toRefs, ref } from 'vue'
import useProps from '../../hooks/useProps.js'

export default {
  components: {
    [ElInput.name]: ElInput,
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption
  },
  props: {
    modelValue: {
      type: [String, Number, Array, Object],
      default: ''
    },
    describe: {
      type: Object,
      default: () => {

      }
    }
  },
  setup(props, ctx) {
    const { modelValue, describe } = toRefs(props)
    console.log(props)
    const value = ref(modelValue.value)

    watch(modelValue, (val) => {
      value.value = val
    })

    const handleInput = (val) => {
      ctx.emit('update:modelValue', val)
    }

    return {
      value,
      describe,
      handleInput
    }
  }
}
</script>

<style>

</style>
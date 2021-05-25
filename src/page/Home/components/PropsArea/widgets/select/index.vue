<template>
  <el-select :modelValue="value" @change="handleInput">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import { ElSelect, ElOption } from 'element-plus'
import { watch, toRefs, ref, onMounted } from 'vue'

export default {
  components: {
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
    const value = ref(modelValue.value)
    const options = ref([])

    watch(modelValue, (val) => {
      value.value = val
    })

    onMounted(() => {
      const { enumLabel, enumValue } = describe.value
      if (enumValue && enumLabel && enumLabel.length) {
        options.value = enumLabel.map((l, index) => {
          return {
            value: enumValue[index],
            label: l
          }
        })
      }
    })

    const handleInput = (val) => {
      ctx.emit('update:modelValue', val)
    }

    return {
      value,
      describe,
      options,
      handleInput
    }
  }
}
</script>

<style>

</style>
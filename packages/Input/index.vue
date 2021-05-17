<template>
  <div>
    <!-- <FormRender
      v-if="currentSelectComponent && currentSelectComponent.schema"
      :key="currentSelectComponent.uid"
      :schema="currentSelectComponent.schema"
      :formData="currentSelectComponent.formData"
      :onChange="handleOnChange"
    /> -->
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'LowInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
  },
  setup() {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.low-image {
  display: block;
  width: 100%;
  
  img {
    display: block;
    width: 100%;
  }

  .image-place {
    width: 85%;
    height: 100px;
    border-radius: 8px;
    margin: 10px auto;
    background-color: #f2f2f2;
  }
}
</style>
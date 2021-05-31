<template>
  <div class="controls-list">
    <div class="controls-item" v-for="(item, index) in formList" :key="item.key">
      <i class="el-icon-remove-outline" @click="handleRemoveFormItem(item, index)"></i>
      <span class="item-label">{{item.label}}</span>
      <div class="operation-wrapper">
        <i class="el-icon-bottom"  v-if="index !== formList.length - 1" @click="handleMove('down', index)"></i>
        <i class="el-icon-top"  v-if="index !== 0" @click="handleMove('up', index)"></i>
        <i class="el-icon-edit-outline" @click="handleEditFormItem(item, index)"></i>
      </div>
    </div>
    <div>
      <el-button type="primary" @click="addFormItem">新增表单项</el-button>
    </div>
    <FormEditModal
      v-model="modalVisible"
      :type="modalType"
      :form="currentEditFormItem"
      title="编辑组件属性"
      width="500px"
      @add="handleOnAdd"
      @edit="handleOnEdit"
    />
  </div>
</template>

<script>
import { ElSelect, ElOption, ElIcon, ElButton } from 'element-plus'
import { watch, toRefs, ref, onMounted } from 'vue'
import FormEditModal from './form-edit-modal.vue'

export default {
  components: {
    FormEditModal,
    [ElIcon.name]: ElIcon,
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption,
    [ElButton.name]: ElButton
  },
  props: {
    modelValue: {
      type: [String, Number, Array, Object],
      default: ''
    },
    describe: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, ctx) {
    const { modelValue, describe } = toRefs(props)
    const formList = ref(modelValue.value)
    const modalVisible = ref(false)
    const currentEditFormItem = ref({})
    const modalType = ref('edit')

    watch(modelValue, (val) => {
      formList.value = val
    })

    let _index = 0

    const handleEditFormItem = (formItem, index) => {
      _index = index
      currentEditFormItem.value = formItem
      modalType.value = 'edit'
      modalVisible.value = true
    }

    const handleRemoveFormItem = (formItem, index) => {
      formList.value.splice(index, 1)
    }

    const handleMove = (direction, index) => {
      const _index = direction === 'up' ? index - 1 : index + 1
      const temp = formList.value[_index]
      formList.value[_index] = formList.value[index]
      formList.value[index] = temp
      // formList.value.splice(index - 1, 1, formList.value[index])
    }

    const addFormItem = () => {
      modalType.value = 'create'
      modalVisible.value = true
    }

    const handleOnAdd = (formData) => {
      formList.value.push({
        ...formData
      })
    }

    const handleOnEdit = (formData) => {
      const origin = formList.value[_index]
      formList.value[_index] = Object.assign({}, origin, formData)
    }

    return {
      formList,
      modalVisible,
      addFormItem,
      modalType,
      handleRemoveFormItem,
      handleMove,
      handleEditFormItem,
      currentEditFormItem,
      handleOnAdd,
      handleOnEdit
    }
  }
}
</script>

<style lang="stylus" scoped>
.controls-list {
  padding: 0 20px;
}

.controls-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .item-label {
    min-width: 100px;
    margin: 0 10px;
    user-select: none;
  }

  i {
    font-size: 20px;
    cursor: pointer;
  }
}

.operation-wrapper {
  text-align: right;
  min-width: 100px;
}
</style>

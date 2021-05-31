<template>
  <div class="props-list-wrapper">
    <div class="props-item">
      <el-form ref="elForm" :model="model" :rules="rules" label-position="top" label-width="100px">
        <el-form-item v-for="(item, key) in currentSelectComponent.tplProps" :key="key" :prop="key" :label="item.title">
          <component :is="getComponentName(item.ui)" v-model="currentSelectComponent.tplData[key]" :describe="item">
          </component>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit">保存页面</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, watch, toRefs, ref, onMounted } from 'vue'
import { state } from '../../store/index.js'
import { ElForm, ElFormItem, ElButton } from 'element-plus'

const componentList = import.meta.globEager('./widgets/*/index.{vue,jsx}')
const widgets = {}
Object.keys(componentList).forEach(key => {
  const wd = componentList[key].default
  const nameList = key.split('/')
  const name = nameList[nameList.length - 2]
  widgets[`wd-${name}`] = wd
})

export default {
  components: {
    ...widgets,
    [ElForm.name]: ElForm,
    [ElFormItem.name]: ElFormItem,
    [ElButton.name]: ElButton
  },
  setup() {
    const rules = ref({})
    const model = ref({})
    const elForm = ref(null)
    const { currentSelectComponent, editComponentList } = state

    const getComponentName = (ui) => {
      switch (ui) {
        case 'input':
          return 'wd-input'
        case 'select':
          return 'wd-select'
        case 'form:controls':
          return 'wd-form-controls'
      }
    }

    watch(() => currentSelectComponent.value.tplProps, (val) => {
      const result = {}
      Object.keys(val).forEach(key => {
        const current = val[key]
        const { required, rules } = current
        const totalRules = []
        if (required) {
          totalRules.push({ required: true, message: '必填项' })
        }
        if (rules && rules.length) {
          totalRules.push(...rules)
        }
        result[key] = totalRules
      })
      rules.value = result
    })

    watch(() => currentSelectComponent.value.tplData, (val) => {
      model.value = val
    })

    const onSubmit = () => {
      if (!elForm.value) return
      elForm.value.validate((valid) => {
        console.log(valid)
        console.log('提交表单数据为：')
        console.log(JSON.stringify(editComponentList.value))
      })
    }
    return {
      currentSelectComponent,
      getComponentName,
      model,
      rules,
      elForm,
      onSubmit
    }
  }
}
</script>

<style lang="stylus" scoped>
.props-list-wrapper {
  width: 100%;
  padding: 15px 25px;
  box-sizing: border-box;
}

.props-item {
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

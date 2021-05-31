export const TEXT_TYPE_OPS = [
  { label: '普通文本', value: 'text' },
  { label: '密码', value: 'password' }
]

export const PICKER_TYPE_OPS = [
  { label: '年月日', value: 'date' },
  { label: '年月', value: 'year-month' },
  { label: '月日', value: 'month-day' },
  { label: '时间', value: 'time' },
  { label: '完整时间', value: 'datetime' },
  { label: '年月日小时', value: 'datehour' }
]

// 可供选择的UI组件，根据开发情况增/减选项
export const UI_OPS = [
  { label: '普通文本框', value: 'van-field' },
  { label: '开关', value: 'van-switch' },
  // { label: '复选框', value: 'van-checkbox' },
  { label: '复选框', value: 'van-checkbox-group' },
  { label: '时间选择器', value: 'van-datetime-picker' }
]

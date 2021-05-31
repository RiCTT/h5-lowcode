const Props = {
  env: {
    title: 'API环境',
    type: 'string',
    ui: 'select',
    enumLabel: ['测试环境1', '测试环境2', '测试环境3'],
    enumValue: ['https://test.com', 'https://test2.com', 'localhost']
  },
  url: {
    title: 'API地址',
    type: 'string',
    ui: 'input'
  },
  items: {
    title: '表单控件',
    type: 'array',
    ui: 'form:controls'
  }
}

const Data = {
  env: 'https://test.com',
  url: '/boss/form-action.do',
  items: [
    {
      key: 'account',
      type: 'text', // tel, digit, number, textarea, password
      label: '账户',
      placeholder: '',
      rules: [{ required: true, message: '请填写用户名' }],
      disabled: false,
      ui: 'van-field'
    },
    {
      key: 'password',
      type: 'password',
      label: '文本',
      placeholder: '',
      rules: [{ required: true, message: '请填写密码' }],
      disabled: false,
      ui: 'van-field'
    },
    {
      key: 'time',
      type: 'time',
      label: '报名时间',
      placeholder: '',
      rules: [],
      disabled: false,
      ui: 'van-datetime-picker'
    }
  ]
}

const tempObj = {}
Object.keys(Props).forEach(key => {
  const keyValue = Data[key]
  const defaultData = keyValue && typeof keyValue === 'object' ? JSON.parse(JSON.stringify(keyValue)) : keyValue
  tempObj[key] = {
    type: [String, Number, Object, Array, Function],
    default: defaultData
  }
})
tempObj.model = {
  account: '',
  password: ''
}

const InjectPropsListMap = { ...tempObj }

export {
  Props,
  Data,
  InjectPropsListMap
}

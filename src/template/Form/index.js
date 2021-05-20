const Props = {
  env: {
    title: 'API环境',
    type: 'string',
    ui: 'select'
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
  },
  rules: {
    title: '校验规则',
    type: 'array',
    ui: 'form:rules'
  }
}

const Data = {
  env: 'https://test-boss.com',
  url: '/boss/form-action.do',
  items: [
    {
      key: 'account',
      type: 'text', // tel, digit, number, textarea, password
      label: '账户',
      placeholder: '',
      rules: [],
      disabled: false,
      ui: 'van-field',
    },
    {
      key: 'password',
      type: 'password',
      label: '文本',
      placeholder: '',
      rules: [],
      disabled: false,
      ui: 'van-field',
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
tempObj['model'] = {
  account: '',
  password: ''
}

const InjectPropsListMap = { ...tempObj }

export {
  Props,
  Data,
  InjectPropsListMap
}
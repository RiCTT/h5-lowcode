const Props = {
  src: {
    title: '图片地址',
    type: 'string',
    ui: 'input'
  },
  href: {
    title: '跳转链接',
    type: 'string',
    ui: 'input'
  },
  target: {
    title: '跳转方式',
    type: 'string',
    ui: 'select'
  }
}

const Data = {
  src: 'https://baidu.com',
  href: 'https://baidu.com',
  target: '__blank'
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

const InjectPropsListMap = { ...tempObj }

export {
  Props,
  Data,
  InjectPropsListMap
}
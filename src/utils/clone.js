
function _clone(data) {
  if (Array.isArray(data)) {
    const result = []
    data.forEach((item, index) => {
      result[index] = _clone(item)
    })
    return result
  }
  if (Object.prototype.toString.call(data) === '[object Object]') {
    const result = {}
    Object.keys(data).forEach(key => {
      result[key] = _clone(data[key])
    })
    return result
  }

  return data
}


export default function clone(data) {
  return _clone(data)
}
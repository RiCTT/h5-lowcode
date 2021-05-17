import { getSubSchemas, convertValue, validate  } from '../utils/index.js'
import Input from './input.vue'

const index = {
  props: {
    schema: Object,
    modelValue: [String, Number, Boolean, Object],
    onChange: Function,
  },
  setup(props) {
    return () => {
      const childrenSchemas = getSubSchemas(props.schema);
      console.log(childrenSchemas)
      console.log(props)
      
      return (
        <div className="form-item object">
          {props.schema.title && <div className="title">{props.schema.title}</div>}
          <div className="content">
            {
              Object.keys(props.modelValue).map((name, index) => {
                const schema = childrenSchemas[index].schema;
                const Field = widgets[mapping[`${schema.type}${schema.format ? `:${schema.format}` : ''}`]];

                if (!Field) {
                  console.log('[Render Warn]: Field is null')
                  return null
                }
            
                const invalidText = null

                return (
                  <Field
                    name={name}
                    invalidText={invalidText}
                    onChange={props.onChange}
                    modelValue={props.modelValue[name]}
                    schema={schema}
                  />
                )
              })
            }
          </div>
        </div>
      )
    }
  }
}

const mapping = {
  // string: 'input',
  string: 'input',
  object: 'map'
}

const widgets = {
  input: Input,
  map: index
}


export { 
  mapping,
  widgets
}
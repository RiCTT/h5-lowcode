import input from './input'
import { getSubSchemas, convertValue, validate  } from '../utils/index.js'

const index = {
  props: {
    schema: Object,
    formData: Object,
    value: [String, Number, Boolean, Object],
    onChange: Function,
    name: String,
  },
  setup(props) {
    return () => {
      const childrenSchemas = getSubSchemas(props.schema);
      
      return (
        <div className="form-item object">
          {props.schema.title && <div className="title">{props.schema.title}</div>}
          <div className="content">
            {
              Object.keys(props.value).map((name, index) => {
                const schema = childrenSchemas[index].schema;
                const Field = widgets[mapping[`${schema.type}${schema.format ? `:${schema.format}` : ''}`]];

                if (!Field) return null;

                // if (convertValue(schema['ui:hidden'], props.value[name], props.value)) {
                //   return {}
                // };

                const invalidText = validate({
                  name,
                  schema,
                  value: props.value[name],
                  required: props.schema.required
                });

                return (
                  <Field
                    invalidText={invalidText}
                    value={props.value[name]}
                    schema={schema}
                    name={name}
                    onChange={(key, val) => {
                      const value = {
                        ...props.value,
                        [key]: val,
                      };
                      props.onChange(props.name, value);
                    }}
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
  string: 'input',
  object: 'map'
}

const widgets = {
  input,
  map: index
}


export { 
  mapping,
  widgets
}
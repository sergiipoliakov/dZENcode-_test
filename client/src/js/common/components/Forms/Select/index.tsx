import Form from "react-bootstrap/esm/Form";

// Types
import { ISelectProps } from "./types";


const Select = (props: ISelectProps) => {
  const {
    placeholder,
    name,
    options = [],
    classNames: { 
      wrapper: wrapperClass = '',
      field: fieldClass = ''
  } = {},
  value: propsValue,
  onChange
  } = props;
  const onChangeValue = (event: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >) => {
    const value = event.target.value
    onChange(value, name);
  }
  return (
    <div className={wrapperClass}>
      <Form.Select
        defaultValue={placeholder}
        aria-label="Default select example"
        aria-placeholder={placeholder}
        className={fieldClass}
        onChange={onChangeValue}
        value={propsValue || undefined}
      >
        <option disabled>{placeholder}</option>
        {
          options.map(({value, text}) => (
            <option key={value} value={value}>{text}</option>
          )
          )
        }
      </Form.Select>

    </div>
  )
}

export default Select;

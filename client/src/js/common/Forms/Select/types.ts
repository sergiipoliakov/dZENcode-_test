type Options = {
  value?: string,
  text?: string
}
interface ISelectProps {
  options: Options[],
  placeholder?: string,
  classNames?: {
    wrapper?: string,
    field?: string,
},
onChange: (value: any, name?: string) => void,
name?: string,
value?: string | any | undefined,
}

export type {
  ISelectProps
}
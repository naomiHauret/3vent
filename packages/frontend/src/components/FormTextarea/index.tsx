import { omitProps } from 'solid-use'
import { input } from '@components/FormInput/styles'

export const FormTextarea = (props) => {
  //@ts-ignore
  return (
    <div class={`flex items-center ${props.wrapperClass ?? ''}`}>
      <textarea
        {...omitProps(props, ['class', 'wrapperClass', 'appearance', 'scale', 'hasError'])}
        class={input({
          //@ts-ignore
          appearance: props.appearance ?? 'square',
          scale: props.scale ?? 'default',
          //@ts-ignore
          variant: props.hasError === true ? 'error' : 'default',
          class: props.class ?? '',
        })}
      />
    </div>
  )
}

export default FormTextarea

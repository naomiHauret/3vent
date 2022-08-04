import { Show } from 'solid-js'
import { omitProps } from 'solid-use'
import { input } from './styles'
import { addon } from './styles'

export const FormInput = (props) => {
  //@ts-ignore
  return (
    <div class={`flex items-center ${props.wrapperClass ?? ''}`}>
      <Show when={props.addonStart}>
        <span
          class={addon({
            //@ts-ignore
            appearance: 'square-start',
            scale: props.scale ?? 'default',
            //@ts-ignore
            variant: props.hasError === true ? 'error' : 'default',
          })}
        >
          {props.addonStart}
        </span>
      </Show>
      <input
        {...omitProps(props, ['class', 'wrapperClass', 'addonStart', 'addonEnd', 'appearance', 'scale', 'hasError'])}
        class={input({
          //@ts-ignore
          appearance: props.appearance ?? 'square',
          scale: props.scale ?? 'default',
          //@ts-ignore
          variant: props.hasError === true ? 'error' : 'default',
          class: props.class ?? '',
        })}
      />
      <Show when={props.addonEnd}>
        <span
          class={addon({
            //@ts-ignore
            appearance: 'square-end',
            scale: props.scale ?? 'default',
            //@ts-ignore
            variant: props.hasError === true ? 'error' : 'default',
          })}
        >
          {props.addonEnd}
        </span>
      </Show>
    </div>
  )
}

export default FormInput

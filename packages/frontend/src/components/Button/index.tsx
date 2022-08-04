import { IconSpinner } from '@components/Icons'
import { omitProps } from 'solid-use'
import button from './button'

export const Button = (props) => {
  return (
    <button
      class={button({
        intent: props.intent ?? 'primary',
        aspect: props.aspect ?? 'default',
        scale: props.scale ?? 'default',
        class: props.class ?? '',
      })}
      aria-disabled={props.disabled || props.isLoading}
      disabled={props.disabled || props.isLoading}
      {...omitProps(props, ['children', 'class', 'isLoading', 'intent', 'scale', 'aspect'])}
    >
      {props.isLoading && <IconSpinner aria-hidden="true" class="animate-spin mie-1ex" />}
      {props.children}
    </button>
  )
}

export default Button

import { Show } from 'solid-js'
import { IconErrorCircleOutline } from '@components/Icons'

const FormField = (props) => {
  return (
    <div
      class={`flex flex-col border-solid rounded-md overflow-hidden border max-w-[inherit] ${props.class ?? ''}`}
      classList={{
        'border-base-300 border-opacity-75 focus-within:border-opacity-90':
          props.hasError === false || !props?.hasError,
        'border-negative-300': props.hasError === true,
      }}
    >
      {props.children}
    </div>
  )
}

const InputField = (props) => {
  return <div class="pt-3 xs:pt-5 pb-3 px-4">{props.children}</div>
}

const Label = (props) => {
  return (
    <label class="flex items-center text-ex font-bold" for={props.form}>
      <Show when={props?.hasError === true}>
        <IconErrorCircleOutline class="text-negative-200 text-lg mie-1.5" />
      </Show>
      {props.children}
    </label>
  )
}

const Description = (props) => {
  return (
    <p class="text-xs mt-1 mb-3" id={props.id}>
      {props.children}
    </p>
  )
}

const HelpBlock = (props) => {
  return (
    <div class="mt-auto px-4 py-3 border-t border-solid border-base-300 bg-base-200 bg-opacity-30 text-2xs border-opacity-50">
      <p class="text-base-400" id={props.id}>
        {props.children}
      </p>
    </div>
  )
}

FormField.InputField = InputField
FormField.Label = Label
FormField.Description = Description
FormField.HelpBlock = HelpBlock

export default FormField

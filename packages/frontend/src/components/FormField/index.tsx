import { Show } from 'solid-js'
import { IconErrorCircleOutline } from '@components/Icons'

const FormField = (props) => {
  return (
    <div
      class={`flex flex-col border-solid rounded-md overflow-hidden border max-w-[inherit] ${props.class ?? ''}`}
      classList={{
        'border-neutral-100 border-opacity-[0.15] focus-within:border-opacity-25':
          props.hasError === false || !props?.hasError,
        'border-negative-600': props.hasError === true,
      }}
    >
      {props.children}
    </div>
  )
}

const InputField = (props) => {
  return <div class="pt-5 pb-3  px-4">{props.children}</div>
}

const Label = (props) => {
  return (
    <label class="flex items-center text-ex font-bold" for={props.form}>
      <Show when={props?.hasError === true}>
        <IconErrorCircleOutline class="text-negative-10 mie-1ex" />
      </Show>
      {props.children}
    </label>
  )
}

const Description = (props) => {
  return (
    <p class="text-neutral-400 text-xs mt-1 mb-3" id={props.id}>
      {props.children}
    </p>
  )
}

const HelpBlock = (props) => {
  return (
    <div
      class="mt-auto px-4 py-3 border-t border-solid text-2xs border-opacity-10"
      classList={{
        'border-neutral-400 bg-white bg-opacity-10': props.hasError === false || !props?.hasError,
        'border-negative-300 bg-negative-800 bg-opacity-20': props.hasError === true,
      }}
    >
      <p
        classList={{
          'text-white text-opacity-50': props.hasError === false || !props?.hasError,
          'text-negative-400': props.hasError === true,
        }}
        id={props.id}
      >
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

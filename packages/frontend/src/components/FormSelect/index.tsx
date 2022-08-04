import { input } from '@components/FormInput/styles'
import { omitProps } from 'solid-use'
import styles from './styles.module.css'
export const FormSelect = (props) => {
  return (
    <div class={`${props?.wrapperClass ?? ''} relative`}>
      <select
        {...omitProps(props, ['class', 'children', 'appearance', 'scale', 'hasError'])}
        class={`pie-10 ${styles.select} ${input({
          //@ts-ignore
          appearance: props.appearance ?? 'square',
          scale: props.scale ?? 'default',
          //@ts-ignore
          variant: props.hasError === true ? 'error' : 'default',
          class: `${props.class}` ?? '',
        })}`}
      >
        {props.children}
      </select>
      <div
        class={`${styles.indicator} absolute inline-end-0 top-0 aspect-square rounded-ie-md h-full z-10 pointer-events-none bg-white bg-opacity-5 border-is border-white border-opacity-10`}
      />
    </div>
  )
}

export default FormSelect

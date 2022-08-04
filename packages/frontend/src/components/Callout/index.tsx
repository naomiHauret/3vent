import callout from './styles'

export const Callout = (props) => {
  //@ts-ignore
  return (
    <p
      class={callout({
        intent: props.intent ?? 'attention',
        scale: props.scale ?? 'default',
        class: props.class ?? '',
      })}
    >
      {props.children}
    </p>
  )
}
export default Callout

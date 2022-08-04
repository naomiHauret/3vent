export const FormCheckbox = (props) => {
  return (
    <label {...props.api().rootProps}>
      <button type="button" disabled={props.api().isChecked} onClick={() => props.api().setChecked(true)}>
        Check
      </button>
      <span {...props.api().labelProps}>
        {props.children} {props.api().isChecked ? 'checked' : 'unchecked'}
      </span>
      <input {...props.api().inputProps} />
      <div {...props.api().controlProps} />
    </label>
  )
}

export default FormCheckbox

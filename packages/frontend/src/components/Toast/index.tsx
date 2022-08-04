import * as toast from '@zag-js/toast'
import { Match, Switch, createMemo } from 'solid-js'
import { useActor, normalizeProps } from '@zag-js/solid'
import { toastIcon, toastLayer } from './styles'
import { IconCircleSolidCheck, IconClose, IconErrorCircleOutline, IconSpinner } from '@components/Icons'

const Toast = (props) => {
  const [state, send] = useActor(props.toast)
  //@ts-ignore
  const api = createMemo(() => toast.connect(state, send, normalizeProps))
  //@ts-ignore
  const layerStyles = toastLayer({ intent: api().type ?? 'info' })
  //@ts-ignore
  const iconStyles = toastIcon({ intent: api().type })

  return (
    <div {...api().rootProps} class={`overflow-hidden ${layerStyles}`}>
      <div class="flex items-center pt-4 pb-3">
        <div class="mis-2 text-lg">
          <Switch>
            <Match when={api().type === 'loading'}>
              <IconSpinner class={`${iconStyles} animate-spin`} />
            </Match>
            <Match when={api().type === 'success'}>
              <IconCircleSolidCheck class={iconStyles} />
            </Match>
            <Match when={api().type === 'error'}>
              <IconErrorCircleOutline class={iconStyles} />
            </Match>
          </Switch>
        </div>
        <div class="pis-3 pie-7">
          <p class="text-xs break-words whitespace-pre-line" {...api().titleProps}>
            {api().title}
          </p>
        </div>
      </div>
      <p>{api().type === 'loading' ? <span /> : null}</p>
      <button
        class="absolute text-opacity-50 hover:text-opacity-75 focus:text-opacity-90 rounded-full text-2xs top-0.5 inline-end-0.5 flex justify-center items-center p-0.5 bg-white bg-opacity-0 hover:bg-opacity-5 focus:bg-opacity-10"
        {...api().closeButtonProps}
      >
        <span class="sr-only">Close this notification</span>
        <IconClose />
      </button>
    </div>
  )
}

export default Toast

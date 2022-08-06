import { Button } from '@components/Button'
import button from '@components/Button/button'
import DialogTrackProgress from '@components/DialogTrackProgress'
import { IconCircleSolidCheck, IconErrorCircleOutline, IconSpinner } from '@components/Icons'
import { ROUTE_EVENT_VIEW } from '@config/routes'
import useNetwork from '@hooks/useNetwork'
import { Link } from 'solid-app-router'
import { Match, Show, Switch } from 'solid-js'

export const DialogTrackProgressDataIndexing = (props) => {
  const { networkData } = useNetwork()

  return (
    <DialogTrackProgress api={props.api}>
      <ol class="space-y-3">
        <li
          classList={{
            'text-base-400': props.stateUploadEventImage.isLoading,
            'text-on-neutral': props.stateUploadEventImage.isSuccess,
            'text-negative-200': props.stateUploadEventImage.isError,
          }}
          class="flex items-center"
        >
          <Switch>
            <Match when={props.stateUploadEventImage.isLoading}>
              <IconSpinner class="text-md mie-1ex animate-spin" />
            </Match>
            <Match when={props.stateUploadEventImage.isSuccess}>
              <IconCircleSolidCheck class="text-md mie-1ex" />
            </Match>
            <Match when={props.stateUploadEventImage.isError}>
              <IconErrorCircleOutline class="text-md mie-1ex" />
            </Match>
          </Switch>
          Uploading event image
        </li>

        <li
          classList={{
            'text-on-neutral text-opacity-50 animate-pulse': props.stateUploadEventImage.isLoading,
            'text-base-400': !props.stateUploadEventImage.isLoading && props.stateUploadEventData.isLoading,
            'text-on-neutral': props.stateUploadEventData.isSuccess,
            'text-negative-200': props.stateUploadEventData.isError,
          }}
          class="flex items-center"
        >
          <Switch>
            <Match when={!props.stateUploadEventImage.isLoading && props.stateUploadEventData.isLoading}>
              <IconSpinner class="text-md mie-1ex animate-spin" />
            </Match>
            <Match when={props.stateUploadEventData.isSuccess}>
              <IconCircleSolidCheck class="text-md mie-1ex" />
            </Match>
            <Match when={props.stateUploadEventData.isError}>
              <IconErrorCircleOutline class="text-md mie-1ex" />
            </Match>
          </Switch>
          Uploading event data
        </li>
        <li
          classList={{
            'text-on-neutral text-opacity-50 animate-pulse':
              props.stateUploadEventImage.isLoading || props.stateUploadEventData.isLoading,
            'text-base-400':
              !props.stateUploadEventImage.isLoading &&
              !props.stateUploadEventData.isLoading &&
              props.stateIndexEvent.isLoading,
            'text-on-neutral': props.stateIndexEvent.isSuccess,
            'text-negative-200': props.stateIndexEvent.isError,
          }}
          class="flex items-center"
        >
          <Switch>
            <Match
              when={
                !props.stateUploadEventImage.isLoading &&
                !props.stateUploadEventData.isLoading &&
                props.stateIndexEvent.isLoading
              }
            >
              <IconSpinner class="text-md mie-1ex animate-spin" />
            </Match>
            <Match when={props.stateIndexEvent.isSuccess}>
              <IconCircleSolidCheck class="text-md mie-1ex" />
            </Match>
            <Match when={props.stateIndexEvent.isError}>
              <IconErrorCircleOutline class="text-md mie-1ex" />
            </Match>
          </Switch>
          <div>
            Indexing your event data on the blockchain. <br />
            <Show when={!props.stateIndexEvent.isSuccess}>
              <span class="font-bold">Make sure to sign the transaction in your wallet !</span>
            </Show>
          </div>
        </li>
      </ol>
      <Show when={props.stateIndexEvent.isSuccess}>
        <p class="animate-appear p-3 font-semibold rounded-md border- mt-6 border border-info-200 bg-info-100 text-on-info">
          Success ! Your event was successfully indexed on the blockchain. 
          <Show when={props?.txReceipt()?.transactionHash}>
            <>
            <br />
            <a
              href={`${networkData().chain.blockExplorers.default.url}/tx/${props.txReceipt()?.transactionHash}`}
              class="block mt-1 font-medium underline hover:no-underline hover:opacity-90 focus:no-underline focus:outline-none"
              target="_blank"
            >
              View transaction on explorer
            </a>
            </>
          </Show>
        </p>
      </Show>
      <div classList={{
         'mt-6': props.stateIndexEvent.isError || props.stateIndexEvent.isSuccess
      }} class='flex flex-col space-y-4 xs:space-y-0 xs:flex-row xs:space-i-4'>
      <Show when={props.stateIndexEvent.isSuccess && props?.txReceipt()?.createdEventId}>
        <Link class={button({})} href={`${ROUTE_EVENT_VIEW.replace(':idEvent', props?.txReceipt()?.createdEventId)}`}>
          Go to event page !
        </Link>
      </Show>
      <Show when={props.stateIndexEvent.isError || props.stateIndexEvent.isSuccess}>
        <Button intent="neutral-revert" {...props.api().closeButtonProps}>
          Go back
        </Button>
      </Show>
      </div>
    </DialogTrackProgress>
  )
}

export default DialogTrackProgressDataIndexing

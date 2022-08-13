import { createEffect, createSignal, Match, Show, Switch } from "solid-js";
import { createTimeDifferenceFromNow, SECOND } from '@solid-primitives/date'
import Button from "@components/Button"
import useRSVPToEvent from './useRSVPToEvent'
import useAccount from "@hooks/useAccount";
import { Portal } from "solid-js/web";
import DialogTrackProgressDataIndexing from "./DialogTrackProgressDataIndexing";
import { formatEther } from "ethers/lib/utils";

export const ButtonRSVPToEvent = (props) => {
    const { accountData } = useAccount()
    const [targetTimestamp] = createSignal(props.event.eventTimestamp * 1);
    const [updateNowInterval] = createSignal(SECOND)
    const [diff] = createTimeDifferenceFromNow(targetTimestamp, updateNowInterval);
    const { 
        checkIfAlreadyRSVPed,
        txReceipt,
        stateIndexEvent,
        apiDialogModalTrackProgress,
        rsvpToEvent, 
    } = useRSVPToEvent()
    const [hasRSVPed, setHasRSVPed] = createSignal(
        !accountData()?.address 
        || checkIfAlreadyRSVPed({ account: accountData()?.address , rsvps: props.event.rsvps }) ? false : true
    )
    const [canRSVP, setCanRSVP] = createSignal(
        (
            !accountData()?.address 
            || diff() <= 0
            || checkIfAlreadyRSVPed({ account: accountData()?.address , rsvps: props.event.rsvps })
        )
        ? false : true
    )

    createEffect(() => {
        if(stateIndexEvent.isSuccess) {
            setHasRSVPed(true)
        }
    })
    createEffect(() => {
        if(
            hasRSVPed() === true ||
            stateIndexEvent.isSuccess ||
            !accountData()?.address
            || diff() <= 0
            || checkIfAlreadyRSVPed({ account: accountData()?.address , rsvps: props.event.rsvps })
        ) {
            setCanRSVP(false)
        } else {
            setCanRSVP(true)
        }
    })
  
  return <>
   <Button
    class="w-full xs:w-auto"
    onClick={() => {
        rsvpToEvent(props.event)
    }}
    isLoading={stateIndexEvent.isLoading}
    disabled={canRSVP() === false}>
        <Show when={diff() <= 0}>
            This event has already ended
        </Show>
        <Show when={diff() > 0}>
    <Switch>
            <Match when={!accountData()?.address}>
                Connect your account to RSVP
            </Match>
            <Match when={accountData()?.address && canRSVP()}>
                <Show when={stateIndexEvent.isError === false && !stateIndexEvent.isLoading}>
                RSVP for {formatEther(props.event.deposit)} MATIC
            </Show>
            <Show when={stateIndexEvent.isLoading}>RSVPing...</Show>
            <Show when={stateIndexEvent.isError === true}>Try again</Show>
            </Match>
            <Match when={accountData()?.address && !canRSVP()}>
                You already RSVPed !
            </Match>
        </Switch>

        </Show>
        
  </Button>
  {apiDialogModalTrackProgress().isOpen && (
        <Portal>
          <DialogTrackProgressDataIndexing
            api={apiDialogModalTrackProgress}
            stateIndexEvent={stateIndexEvent}
            txReceipt={txReceipt}
          />
        </Portal>
      )}

  </>
}

export default ButtonRSVPToEvent
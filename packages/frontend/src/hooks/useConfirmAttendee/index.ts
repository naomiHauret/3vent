import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createEffect, createMemo, createUniqueId } from 'solid-js'
import useToast from '@hooks/useToast'
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { createSignal } from 'solid-js'
import { createAsyncStore } from '@hooks/useAsync'
import abiWeb3RSVP from '@abis/web3rsvp'
import { CONTRACT_3VENT_RSVP } from '@config/contracts'

const useStoreIndexEvent = createAsyncStore()

export function useConfirmAttendee() {
    const [txReceipt, setTxReceipt] = createSignal()
    const [successMessage, setSuccessMessage] = createSignal()
    const stateIndexEvent = useStoreIndexEvent()
    const [stateDialogModalTrackProgress, sendDialogModalTrackProgress] = useMachine(
      dialog.machine({
        role: 'alertdialog',
        closeOnOutsideClick: false,
        closeOnEsc: false,
        preventScroll: true,
  
        id: createUniqueId(),
      }),
    )
  
    const apiDialogModalTrackProgress = createMemo(() =>
      dialog.connect(stateDialogModalTrackProgress, sendDialogModalTrackProgress, normalizeProps),
    )
    const toast = useToast()

    async function confirmAttendee({eventId, attendee}) {
        stateIndexEvent.setIsLoading(true)
        stateIndexEvent.setError(null, false)
        setSuccessMessage()
        apiDialogModalTrackProgress().open()
        try {
            const config = await prepareWriteContract({
              addressOrName: CONTRACT_3VENT_RSVP,
              args: [eventId, attendee],
              contractInterface: abiWeb3RSVP,
              functionName: 'confirmAttendee',
            })

            const txn = await writeContract({
              ...config,
            })
            const receipt = await waitForTransaction({
              hash: txn.hash,
            })

            stateIndexEvent.setIsLoading(false)
            setSuccessMessage("Attendee confirmed successfully!")
            stateIndexEvent.setIsSuccess(true)
            stateIndexEvent.setError(null, false)
            setTxReceipt(receipt)
            
            } catch(e) {
              console.error(e)
              stateIndexEvent.setError(e?.message ?? e, true)
              stateIndexEvent.setIsLoading(false)
              stateIndexEvent.setIsSuccess(false)
              //@ts-ignore
              toast().create({
                type: 'error',
                title: `Something went wrong and this attendance couldn't be confirmed: ${e?.message ?? e}`,
              })
              console.error(e)
        }
    }


    async function confirmAllAttendees(eventId) {
        stateIndexEvent.setIsLoading(true)
        stateIndexEvent.setError(null, false)
        setSuccessMessage()
        apiDialogModalTrackProgress().open()
        try {
            const config = await prepareWriteContract({
              addressOrName: CONTRACT_3VENT_RSVP,
              args: [eventId],
              overrides: {
                gasLimit: 300000
              },
              contractInterface: abiWeb3RSVP,
              functionName: 'confirmAllAttendees',
            })

            const txn = await writeContract({
              ...config,
            })
            const receipt = await waitForTransaction({
              hash: txn.hash,
            })

            stateIndexEvent.setIsLoading(false)
            setSuccessMessage("All attendees were confirmed successfully!")
            stateIndexEvent.setIsSuccess(true)
            stateIndexEvent.setError(null, false)
            setTxReceipt(receipt)
            
            } catch(e) {
              console.error(e)
              stateIndexEvent.setError(e?.message ?? e, true)
              stateIndexEvent.setIsLoading(false)
              stateIndexEvent.setIsSuccess(false)
              //@ts-ignore
              toast().create({
                type: 'error',
                title: `Something went wrong and the attendees couldn't be confirmed: ${e?.message ?? e}`,
              })
              console.error(e)
            }

    }

    createEffect(() => {
        if (!apiDialogModalTrackProgress().isOpen) {
          setSuccessMessage()
          stateIndexEvent.setIsLoading(false)
          stateIndexEvent.setIsSuccess(false)
          stateIndexEvent.setError(null, false)
        }
      })

      
    return {
        txReceipt,
        stateIndexEvent,
        apiDialogModalTrackProgress,
        confirmAttendee, 
        confirmAllAttendees,
        successMessage,
    }
}

export default useConfirmAttendee
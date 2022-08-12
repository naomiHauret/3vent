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

export function useRSVPToEvent() {
    const [txReceipt, setTxReceipt] = createSignal()
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
  
    function checkIfAlreadyRSVPed({account, rsvps}) {
        if (account) {
          for (let i = 0; i < rsvps.length; i++) {
            const thisAccount = account.toLowerCase();
            if (rsvps[i].attendee.id.toLowerCase() == thisAccount) {
              return true;
            }
          }
        }
        return false;
    }

    async function rsvpToEvent(event) {
        stateIndexEvent.setIsLoading(true)
        stateIndexEvent.setError(null, false)
        apiDialogModalTrackProgress().open()
    
            try {
                const config = await prepareWriteContract({
                    addressOrName: CONTRACT_3VENT_RSVP,
                    args: [event.id],
                    overrides: {
                      value: event.deposit,
                      gasLimit: 300000,
      
                    },
                    contractInterface: abiWeb3RSVP,
                    functionName: 'createNewRSVP',
                  })

                  const txn = await writeContract({
                    ...config,
                  })
                  const receipt = await waitForTransaction({
                    hash: txn.hash,
                  })

                  stateIndexEvent.setIsLoading(false)
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
                  title: `Something went wrong and you couldn't RSVP to this event: ${e?.message ?? e}`,
                })
                console.error(e)
          
            }

    }

    createEffect(() => {
        if (!apiDialogModalTrackProgress().isOpen) {
    
          stateIndexEvent.setIsLoading(false)
          stateIndexEvent.setIsSuccess(false)
          stateIndexEvent.setError(null, false)
        }
      })

      
    return {
        checkIfAlreadyRSVPed,
        txReceipt,
        stateIndexEvent,
        apiDialogModalTrackProgress,
        rsvpToEvent, 
    }
}

export default useRSVPToEvent
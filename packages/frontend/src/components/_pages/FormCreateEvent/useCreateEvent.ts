import { string, object, number, instanceof as zodValidationInstanceOf } from 'zod'
import { validator } from '@felte/validator-zod'
import { createForm } from '@felte/solid'
import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createEffect, createMemo, createUniqueId } from 'solid-js'
import useToast from '@hooks/useToast'
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { createSignal } from 'solid-js'
import { createAsyncStore } from '@hooks/useAsync'
import { defaultAbiCoder, parseEther } from "ethers/lib/utils";
import abiWeb3RSVP from '@abis/web3rsvp'
import { CONTRACT_3VENT_RSVP } from '@config/contracts'
import { makeStorageClient } from '@config/web3storage'
import { isPast } from 'date-fns'

const schema = object({
  name: string().trim(),
  timestamp: string().refine((value) => !isPast(new Date(value))),
  deposit: number().nonnegative(),
  maxCapacity: number().int().positive(),
  image: zodValidationInstanceOf(File),
  description: string().trim(),
  link: string().url(),
})

const useStoreUploadEventImage = createAsyncStore()
const useStoreUploadEventData = createAsyncStore()
const useStoreIndexEvent = createAsyncStore()

export function useCreateEvent() {
  const [txReceipt, setTxReceipt] = createSignal()
  const stateUploadEventImage = useStoreUploadEventImage()
  const stateUploadEventData = useStoreUploadEventData()
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

  // Event image
  const [eventImageSrc, setEventImageSrc] = createSignal(null)

  // CIDs
  const [eventImageCID, setEventImageCID] = createSignal()
  const [eventDataCID, setEventDataCID] = createSignal()

  // Form
  const storeForm = createForm({
    onSubmit: async (values) => {
      await createEvent(values)
    },
    extend: validator({ schema }),
  })

  function onInputEventImageChange(file) {
    const src = URL.createObjectURL(file)
    setEventImageSrc(src)
  }

  async function uploadEventImage(file) {
    stateUploadEventImage.setIsLoading(true)
    try {
      const client = makeStorageClient()
      const cid = await client.put([file])
      setEventImageSrc(cid)
      setEventImageCID(cid)
      stateUploadEventImage.setIsSuccess(true)
      stateUploadEventImage.setIsLoading(false)
      stateUploadEventImage.setError(null, false)
      return cid
    } catch (e) {
      console.error(e)
      stateIndexEvent.setIsLoading(false)
      stateIndexEvent.setIsSuccess(false)
      stateIndexEvent.setError(e?.message ?? e, true)
      stateUploadEventImage.setIsSuccess(false)
      stateUploadEventImage.setIsLoading(false)
      stateUploadEventImage.setError(e?.message ?? e, true)
    }
  }

  async function uploadEventData(jsonFile) {
    stateUploadEventData.setIsLoading(true)
    try {
      const client = makeStorageClient()
      const cid = await client.put([jsonFile])
      setEventDataCID(cid)
      stateUploadEventData.setIsSuccess(true)
      stateUploadEventData.setIsLoading(false)
      stateUploadEventData.setError(null, false)
      return cid
    } catch (e) {
      console.error(e)
      stateIndexEvent.setIsLoading(false)
      stateIndexEvent.setIsSuccess(false)
      stateIndexEvent.setError(e?.message ?? e, true)
      stateUploadEventData.setIsSuccess(false)
      stateUploadEventData.setIsLoading(false)
      stateUploadEventData.setError(e?.message ?? e, true)
    }
  }

  async function createEvent(values) {
    stateIndexEvent.setIsLoading(true)
    stateIndexEvent.setError(null, false)
    apiDialogModalTrackProgress().open()

    try {
      const imageCid = !eventImageCID() ? await uploadEventImage(values.image) : eventImageCID()
      const deposit = parseEther(`${values.deposit}`)
      const eventDateAndTime = new Date(`${values.timestamp}`)
      const eventTimestamp = eventDateAndTime.getTime()

      const eventData = {
        name: values.name,
        description: values.description,
        link: values.link,
        image: imageCid,
      }
      const eventDataJSON = new File([JSON.stringify(eventData)], 'data.json', {
        type: 'application/json',
      })
      const dataCID = !eventDataCID() ? await uploadEventData(eventDataJSON) : eventDataCID()

      const config = await prepareWriteContract({
        addressOrName: CONTRACT_3VENT_RSVP,
        args: [eventTimestamp, deposit, values.maxCapacity, dataCID],
        contractInterface: abiWeb3RSVP,
        functionName: 'createNewEvent',
      })
      const txn = await writeContract({
        ...config,
      })
      const receipt = await waitForTransaction({
        hash: txn.hash,
      })
      const data = receipt.logs[0]?.data

      const [eventId] = defaultAbiCoder.decode(
        ['bytes32'], data
      )

      stateIndexEvent.setIsLoading(false)
      stateIndexEvent.setIsSuccess(true)
      stateIndexEvent.setError(null, false)
      setTxReceipt({...receipt, createdEventId: eventId})
      setEventDataCID()
      setEventImageCID()
    } catch (e) {
      console.error(e)
      stateIndexEvent.setError(e?.message ?? e, true)
      stateIndexEvent.setIsLoading(false)
      stateIndexEvent.setIsSuccess(false)
      //@ts-ignore
      toast().create({
        type: 'error',
        title: `Something went wrong and we couldn't create your game: ${e?.message ?? e}`,
      })
      console.error(e)
    }
  }

  createEffect(() => {
    if (!apiDialogModalTrackProgress().isOpen) {
      stateUploadEventImage.setIsSuccess(false)
      stateUploadEventImage.setIsLoading(false)
      stateUploadEventImage.setError(null, false)

      stateUploadEventData.setIsLoading(false)
      stateUploadEventData.setIsSuccess(false)
      stateUploadEventData.setError(null, false)

      stateIndexEvent.setIsLoading(false)
      stateIndexEvent.setIsSuccess(false)
      stateIndexEvent.setError(null, false)
    }
  })

  return {
    txReceipt,
    storeForm,
    stateIndexEvent,
    stateUploadEventData,
    eventImageSrc,
    onInputEventImageChange,
    stateUploadEventImage,
    apiDialogModalTrackProgress,
  }
}

export default useCreateEvent

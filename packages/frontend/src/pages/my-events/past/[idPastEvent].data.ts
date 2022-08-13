import { createResource, createSignal, onMount } from 'solid-js'
import { getEventAndAttendees } from '@graphql/event/get-event-and-attendees'
import { useParams } from 'solid-app-router'
import { watchContractEvent } from '@wagmi/core'
import abiWeb3RSVP from '@abis/web3rsvp'
import { CONTRACT_3VENT_RSVP } from '@config/contracts'

async function fetchPastEventData({idPastEvent, timestamp}) {
  const event = await getEventAndAttendees(`${idPastEvent}`)
  return event
}

export function PastEventData() {
  const params = useParams()
  const [timestamp, setTimestamp] = createSignal(new Date().getTime().toString())
  const [event] = createResource(() => ({
    timestamp: timestamp(),
    idPastEvent: params.idPastEvent
  }), fetchPastEventData)
  onMount(() => {
    watchContractEvent({
      contractInterface: abiWeb3RSVP,
      addressOrName: CONTRACT_3VENT_RSVP
    }, "ConfirmedAttendee", () => {
      setTimestamp(new Date().getTime().toString())
      setTimeout(() => setTimestamp(new Date().getTime().toString()), 2000)
      setTimeout(() => setTimestamp(new Date().getTime().toString()), 4000)
      setTimeout(() => setTimestamp(new Date().getTime().toString()), 6000)
    })
  })
  return event
}

export default PastEventData

import { createResource } from 'solid-js'
import { getEventDetails } from '@graphql/event/get-event'

async function fetchEventData(idEvent) {
    console.log(idEvent)
  const event = await getEventDetails(`${idEvent}`)
  console.log(event)
  return event
}

export function EventData({ params }) {
  const [event] = createResource(() => params.idEvent, fetchEventData)
  return event
}

export default EventData

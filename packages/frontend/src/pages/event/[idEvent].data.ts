import { createResource } from 'solid-js'
import { getEventDetails } from '@graphql/event/get-event'

async function fetchEventData(idEvent) {
  const event = await getEventDetails(`${idEvent}`)
  return event
}

export function EventData({ params }) {
  const [event] = createResource(params.idEvent, fetchEventData)
  return event
}

export default EventData

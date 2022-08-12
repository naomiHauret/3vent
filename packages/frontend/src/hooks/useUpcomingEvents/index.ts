import getUpcomingEvents from "@graphql/event/get-upcoming-events"
import { createSignal, createResource } from "solid-js"

async function fetchUpcomingEvents(timestamp) {
    const result = await getUpcomingEvents(timestamp)
    return result
  }
  
export function useUpcomingEvents() {
    const [timestamp] = createSignal(new Date().getTime().toString())
    const [upcomingEvents] = createResource(timestamp, fetchUpcomingEvents)
    return upcomingEvents
}

export default useUpcomingEvents
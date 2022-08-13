import { client } from "@config/urql";

const GET_USER_UPCOMING_EVENTS = `
query Events($eventOwner: String, $currentTimestamp: String) {
  events(
    where: { eventOwner: $eventOwner, eventTimestamp_gt: $currentTimestamp }
  ) {
    id
    eventID
    name
    description
    eventTimestamp
    maxCapacity
    totalRSVPs
    imageURL
  }
}
`

export async function getUserUpcomingEvents(eventOwner) {
    const result = await client
      .query(GET_USER_UPCOMING_EVENTS, {
        eventOwner,
        currentTimestamp: new Date().getTime().toString()
      })
      .toPromise()
    return result
  }
  
  export default getUserUpcomingEvents

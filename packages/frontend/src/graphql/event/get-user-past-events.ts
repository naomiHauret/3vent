import { client } from "@config/urql";

const GET_USER_PAST_EVENTS = `
query Events($eventOwner: String, $currentTimestamp: String) {
  events(
    where: { eventOwner: $eventOwner, eventTimestamp_lt: $currentTimestamp }
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
`;

export async function getUserPastEvents(eventOwner) {
    const result = await client
      .query(GET_USER_PAST_EVENTS, {
        eventOwner,
        currentTimestamp: `${new Date().getTime().toString()}`
      })
      .toPromise()
    return result
  }
  
  export default getUserPastEvents

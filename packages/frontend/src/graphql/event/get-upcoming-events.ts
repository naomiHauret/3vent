import { client } from "@config/urql";

const GET_UPCOMING_EVENTS = `
query Events($currentTimestamp: String) {
    events(where: { eventTimestamp_gt: $currentTimestamp }) {
      id
      name
      eventTimestamp
      imageURL
    }
  }`


export async function getUpcomingEvents(timestamp) {
    const result = await client
      .query(GET_UPCOMING_EVENTS, {
        currentTimestamp: timestamp  
      })
      .toPromise()
    return result
  }
  
  export default getUpcomingEvents
  
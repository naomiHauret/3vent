import { client } from "@config/urql";

const GET_EVENT_ATTENDEES = `
      query Event($id: String!) {
        event(id: $id) {
          id
          eventID
          name
          eventOwner
          eventTimestamp
          maxCapacity
          totalRSVPs
          totalConfirmedAttendees
          rsvps {
            id
            attendee {
              id
            }
          }
          confirmedAttendees {
            attendee {
              id
            }
          }
        }
      }
`

export async function getEventAndAttendees(id) {
    const result = await client
      .query(GET_EVENT_ATTENDEES, {
        id: id  
      })
      .toPromise()
    return result
  }
  
  export default getEventAndAttendees

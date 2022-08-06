import { client } from "@config/urql";

const GET_EVENT = `
  query Event($id: String!) {
    event(id: $id) {
      id
      eventID
      name
      description
      link
      eventOwner
      eventTimestamp
      maxCapacity
      deposit
      totalRSVPs
      totalConfirmedAttendees
      imageURL
      rsvps {
  id
  attendee {
    id
  }
      }
    }
  }
`


export async function getEventDetails(id) {
    const result = await client
      .query(GET_EVENT, {
        id: id  
      })
      .toPromise()
    return result
  }
  
  export default getEventDetails
  
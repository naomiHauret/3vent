import { client } from "@config/urql";

const GET_UPCOMING_RSVPS = `
query Account($id: String) {
  account(id: $id) {
    id
    rsvps {
      event {
        id
        name
        eventTimestamp
        imageURL
      }
    }
  }
}
`

export async function getUpcomingRSVPs(id) {
    const result = await client
      .query(GET_UPCOMING_RSVPS, {
        id,
      })
      .toPromise()
    return result
  }
  
  export default getUpcomingRSVPs
  
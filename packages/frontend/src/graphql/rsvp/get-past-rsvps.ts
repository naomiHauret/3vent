import { client } from "@config/urql";

const GET_PAST_RSVPS = `
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

export async function getPastRSVPs(id) {
    const result = await client
      .query(GET_PAST_RSVPS, {
        id,
      })
      .toPromise()
    return result
  }
  
  export default getPastRSVPs
  
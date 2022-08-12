import getUpcomingRSVPs from "@graphql/rsvp/get-upcoming-rsvps"
import useAccount from "@hooks/useAccount"
import { createSignal, createResource, createEffect } from "solid-js"

async function fetchUpcomingRSVPs(id) {
    
    const result = await getUpcomingRSVPs(id)
    return result
  }
  
export function useUpcomingRSVPs() {
    const { accountData } = useAccount()
    const [id, setId] = createSignal(accountData()?.address?.toLowerCase() ?? "")
    const [upcomingRSVPs] = createResource(id, fetchUpcomingRSVPs)
    
    createEffect(() => {
        if(!accountData()?.address) setId("")
        else {
            setId(accountData()?.address?.toLowerCase() ?? "")
        }
    })
    return upcomingRSVPs
}

export default useUpcomingRSVPs
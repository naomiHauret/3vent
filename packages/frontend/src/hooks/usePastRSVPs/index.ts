import getPastRSVPs from "@graphql/rsvp/get-past-rsvps"
import useAccount from "@hooks/useAccount"
import { createSignal, createResource, createEffect } from "solid-js"

async function fetchPastRSVPs(id) {
    const result = await getPastRSVPs(id)
    return result
  }
  
export function usePastRSVPs() {
    const { accountData } = useAccount()
    const [id, setId] = createSignal(accountData()?.address?.toLowerCase() ?? "")
    const [pastRSVPS] = createResource(id, fetchPastRSVPs)
    
    createEffect(() => {
        if(!accountData()?.address) setId("")
        else {
            setId(accountData()?.address?.toLowerCase() ?? "")
        }
    })
    return pastRSVPS
}

export default usePastRSVPs
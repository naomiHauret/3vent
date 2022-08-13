import getUserPastEvents from "@graphql/event/get-user-past-events"
import useAccount from "@hooks/useAccount"
import { createSignal, createResource, createEffect } from "solid-js"

async function fetchUserPastEvents(id) {
    const result = await getUserPastEvents(id)
    return result
  }
  
export function useUserPastEvents() {
    const { accountData } = useAccount()
    const [id, setId] = createSignal(accountData()?.address?.toLowerCase() ?? "")
    const [userPastEvents] = createResource(id, fetchUserPastEvents)
    
    createEffect(() => {
        if(!accountData()?.address) setId("")
        else {
            setId(accountData()?.address?.toLowerCase() ?? "")
        }
    })
    return userPastEvents
}

export default useUserPastEvents
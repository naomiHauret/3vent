import getUserUpcomingEvents from "@graphql/event/get-user-upcoming-events"
import useAccount from "@hooks/useAccount"
import { createSignal, createResource, createEffect } from "solid-js"

async function fetchUserUpcomingEvents(id) {
    const result = await getUserUpcomingEvents(id)
    return result
  }
  
export function useUserUpcomingEvents() {
    const { accountData } = useAccount()
    const [id, setId] = createSignal(accountData()?.address?.toLowerCase() ?? "")
    const [userUpcomingEvents] = createResource(id, fetchUserUpcomingEvents)
    
    createEffect(() => {
        if(!accountData()?.address) setId("")
        else {
            setId(accountData()?.address?.toLowerCase() ?? "")
        }
    })
    return userUpcomingEvents
}

export default useUserUpcomingEvents
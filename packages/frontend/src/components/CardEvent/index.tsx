import { PREFIX_ROUTE_MY_EVENTS, ROUTE_EVENT_VIEW, ROUTE_MY_PAST_EVENTS, ROUTE_MY_PAST_EVENTS_VIEW_EVENT } from "@config/routes"
import { formatDistanceToNow } from "date-fns"
import { Link, useLocation } from "solid-app-router"

export const CardEvent = (props) => {
  const location = useLocation()

  return <article class="flex flex-col relative overflow-hidden border border-base-content border-opacity-20 hover:border-opacity-25 focus:border-opacity-30 rounded h-full w-full">
   <header class="relative w-full aspect-video">
  <span class="top-0 left-0 absolute  w-full h-full animate-pulse bg-neutral" />
  <img class="top-0 left-0 absolute w-full h-full object-cover z-10" src={props?.event?.imageURL} alt="" />
  </header>
  <div class="px-3 pb-8 pt-4">
    <span class="font-bold">{props?.event?.name}</span>
  </div>
  <div class="mt-auto px-3 pb-2 italic">
    <p class="text-2xs text-neutral">{formatDistanceToNow(props?.event?.eventTimestamp * 1, { addSuffix: true })}</p>
  </div>
  <Link 
    title={`View ${props?.event?.name} page`}
    class="z-20 absolute w-full h-full top-0 left-0 opacity-0"
    href={
      location.pathname === ROUTE_MY_PAST_EVENTS 
      ? ROUTE_MY_PAST_EVENTS_VIEW_EVENT.replace(':idPastEvent', props?.event?.id )
      : ROUTE_EVENT_VIEW.replace(':idEvent', props?.event?.id )
    }
  >
    See event
  </Link>
  </article>
}

export default CardEvent
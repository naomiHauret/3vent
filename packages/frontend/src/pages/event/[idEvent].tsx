import { IconPeople, IconTicket, IconWaving } from '@components/Icons'
import { chains } from '@config/wagmi'
import { shortenEthereumAddress } from '@helpers/shortenEthereumAddress'
import { format, formatDistanceToNow } from 'date-fns'
import { useRouteData } from 'solid-app-router'
import { createEffect, createSignal, Match, Switch } from 'solid-js'
import { Meta, Title } from 'solid-meta'
import ButtonRSVPToEvent from '@components/_pages/ButtonRSVPToEvent'

export default function Page() {
  const event = useRouteData()
  const [eventOwner, setEventOwner] = createSignal("")

  createEffect(() => {
    if(event()?.data?.event?.eventOwner) {
      setEventOwner(shortenEthereumAddress(event()?.data?.event?.eventOwner))
    }
  })

  return (
    <>
      <Title>Event details - 3vent</Title>
      <Meta name="description" content="Learn more about virtual events on 3vent." />
      <div class="flex-grow pt-10">
      <Switch>
        <Match when={event?.loading}>
          <div class="container mx-auto animate-appear">
            Loading, one moment please...
          </div>
        </Match>
        <Match when={event()?.data?.event === null && event()?.error}>
          <Title>Something went wrong - 3vent</Title>
          <div class="container mx-auto animate-appear">
            <p>
              {event()?.error}
            </p>
          </div>
        </Match>
        <Match when={event()?.data?.event === null && event?.loading === false}>
          <Title>Event not found - 3vent</Title>
          <div class="container mx-auto animate-appear text-center">
            <h1 class="font-bold text-xl mb-4">Event not found</h1>
            <p>
              It looks like the event you're looking for doesn't exist.
            </p>
          </div>
        </Match>
        <Match when={event()?.data?.event}>
          <main class="mx-auto container flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-i-24">
            <Title>{event().data.event.name} - 3vent</Title>
            <Meta name="description" content={`Learn more about ${event().data.event.name} on 3vent.`} />

            <section class="w-full md:w-2/3">
              <h1 class='sr-only'>
                {event().data.event.name}
              </h1>
              <div class="flex flex-col">
                <span class="text-2xs text-neutral flex flex-wrap items-baseline">
                  <span class="pie-1ex">
                  {format(new Date(event().data.event?.eventTimestamp * 1), "PPpp")}

                  </span>
                  <span class="text-3xs">&nbsp;({formatDistanceToNow(event().data.event?.eventTimestamp * 1, { addSuffix: true })})</span>
                </span>
                <span class='font-bold text-xl mb-4'>
                  {event().data.event.name}
                </span>
              </div>
              <div class='relative max-w-full w-full aspect-video rounded-md overflow-hidden'>
                <span class="top-0 left-0 absolute  w-full h-full animate-pulse bg-neutral" />
                <img class="top-0 left-0 absolute w-full h-full object-cover z-10" src={event().data.event.imageURL} alt="" />
              </div>
              <p class="mt-8">
                {event().data.event.description}
              </p>
            </section>
            <section class="w-full md:w-1/3 md:pt-16 text-2xs">
              <p class='flex flex-wrap items-center'>
                <IconPeople class="mie-1ex text-sm" />
                {event().data.event.totalConfirmedAttendees} / {event().data.event.maxCapacity} attending
              </p>
              <p class="my-2 flex flex-wrap items-center">
                <IconTicket class="mie-1ex text-sm" />
                1 RSVP per wallet
              </p>
              <p class='flex flex-wrap items-center mb-6'>
                <IconWaving class="mie-1ex text-sm" />
                Hosted by&nbsp; <a target="_blank" class="link font-mono" rel="nofollow noreferrer" href={`${chains[0].blockExplorers.default.url}/address/${event().data.event.eventOwner}`}>{eventOwner()}</a>
              </p>
              <ButtonRSVPToEvent
                event={event()?.data?.event}
              />
            </section>
          </main>
        </Match>
      </Switch>
      </div>
    </>
  )
}

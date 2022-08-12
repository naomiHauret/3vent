import button from '@components/Button/button'
import CardEvent from '@components/CardEvent'
import { ROUTE_EVENT_NEW } from '@config/routes'
import { useUpcomingEvents } from '@hooks/useUpcomingEvents'
import { Link } from 'solid-app-router'
import { Show, For } from 'solid-js'
import { Title } from 'solid-meta'

export default function Page() {
  const upcomingEvents = useUpcomingEvents()

  return (
    <>
      <Title>3vent - your web3 RSVP</Title>
      <main class="m-auto container">
        <div class="max-w-screen-sm">
          <section>
          <h1 class="text-4xl font-bold leading-tight mb-6">Discover what's happening in the metaverse</h1>

          <p class="text-lg">Find, join, and create virtual events with your web3 frens!</p>

          <div class="mt-6 flex flex-col space-y-3 xs:flex-row xs:space-y-0 xs:space-i-2">
            <Link href={ROUTE_EVENT_NEW} class={
              button({
                scale: "sm",
                intent: "neutral-revert"
              })
            }>
              Create event
            </Link>
          </div>
          </section>
        </div>
        <section class="pt-12">
            <h2 class="font-bold text-lg text-on-info mb-6">Upcoming events</h2>


            <Show when={upcomingEvents?.loading}>
            <div class="grid gap-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 animate-appear">
                <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
                <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
                <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
                <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
                <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
                <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
            </div>
            </Show>
            <Show when={upcomingEvents()?.data?.events}>
              <ul class="grid gap-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 animate-appear">
                <For each={upcomingEvents()?.data?.events}>
                  {event => <li class="col-span-1">
                    <CardEvent event={event} />
                  </li>}
                </For>
              </ul>
            </Show>
          </section>

      </main>
    </>
  )
}

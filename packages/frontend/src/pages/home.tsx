import button from '@components/Button/button'
import CardEvent from '@components/CardEvent'
import ListEvents from '@components/ListEvents'
import { ROUTE_EVENT_NEW } from '@config/routes'
import { useUpcomingEvents } from '@hooks/useUpcomingEvents'
import { Link } from 'solid-app-router'
import { Title } from 'solid-meta'

export default function Page() {
  const upcomingEvents = useUpcomingEvents()

  return (
    <>
      <Title>3vent - your web3 RSVP</Title>
      <main class="mx-auto container">
        <div class="max-w-screen-sm">
          <section class="pt-16 md:pt-20">
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
          <h2 class="font-bold text-lg text-on-info mb-6">Latest upcoming events</h2>
          <ListEvents
            loading={upcomingEvents?.loading}
            list={upcomingEvents()?.data?.events}
            error={upcomingEvents()?.error}
          />
        </section>
      </main>
    </>
  )
}

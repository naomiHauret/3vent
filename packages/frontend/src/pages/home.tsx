import Button from '@components/Button'
import button from '@components/Button/button'
import { ROUTE_EVENT_NEW } from '@config/routes'
import useAccount from '@hooks/useAccount'
import { Link } from 'solid-app-router'
import { Show } from 'solid-js'
import { Title } from 'solid-meta'

export default function Page() {
  const { accountData } = useAccount()
  return (
    <>
      <Title>3vent - your web3 RSVP</Title>
      <main class="m-auto container">
        <div class="max-w-screen-sm">
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
        </div>
      </main>
    </>
  )
}

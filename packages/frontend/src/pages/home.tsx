import Button from '@components/Button'
import useAccount from '@hooks/useAccount'
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
            <Show when={!accountData()?.address}>
              <Button>Connect web3 wallet</Button>
            </Show>

            <Button scale="sm" intent="neutral-revert">
              Create event
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}

import { Match, Show, Switch } from 'solid-js'
import useAccount from '@hooks/useAccount'
import ButtonGroupWalletOptions from '@components/ButtonGroupWalletOptions'
import useNetwork from '@hooks/useNetwork'
import ButtonSwitchNetwork from '@components/ButtonSwitchNetwork'
import ListEvents from '@components/ListEvents'
import { Meta, Title } from 'solid-meta'
import useUserPastEvents from '@hooks/useUserPastEvents'

export default function Page() {
  const { accountData } = useAccount()
  const { networkData } = useNetwork()
  const  userPastEvents = useUserPastEvents()

  return (
    <>
      <Title>My past events - 3vent</Title>
      <Meta name="description" content="Manage your past events on 3vent." />

      <main class="flex flex-col mx-auto container flex-grow animate-appear pt-10">
        <h1 class="font-bold text-xl mb-6">My past events</h1>
        <Switch>
          <Match when={!accountData()?.address}>
            <div class="animate-appear m-auto max-w-screen-2xs">
              <p class="mb-6">
                Connect your wallet and make sure to use <span class="font-bold">Polygon Mumbai network</span> to view your past events.
              </p>
              <ButtonGroupWalletOptions />
            </div>
          </Match>
          <Match when={accountData()?.address}>
            <Show when={networkData()?.chain?.unsupported === true}>
              <div class="animate-appear flex flex-col sm:justify-center sm:items-center sm:text-center mt10: sm:m-auto max-w-screen-2xs">
                <p class="mb-6">
                  Make sure to use <span class="font-bold">Polygon Mumbai network</span> to see your past events.
                </p>
                <ButtonSwitchNetwork />
              </div>
            </Show>
            <Show when={networkData()?.chain?.unsupported === false}>
              <ListEvents
                loading={userPastEvents?.loading}
                list={userPastEvents()?.data?.events}
                error={userPastEvents()?.error}
              />
            </Show>
          </Match>
        </Switch>
      </main>
    </>
  )
}


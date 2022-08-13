import { Meta, Title } from 'solid-meta'
import useUpcomingRSVPs from '@hooks/useUpcomingRSVPs'
import { Match, Show, Switch } from 'solid-js'
import useAccount from '@hooks/useAccount'
import ButtonGroupWalletOptions from '@components/ButtonGroupWalletOptions'
import useNetwork from '@hooks/useNetwork'
import ButtonSwitchNetwork from '@components/ButtonSwitchNetwork'
import ListEvents from '@components/ListEvents'

export default function Page() {
  const { accountData } = useAccount()
  const { networkData } = useNetwork()
  const  upcomingRSVPs = useUpcomingRSVPs()

  return (
    <>
      <Title>Upcoming RSVPs - 3vent</Title>
      <Meta name="description" content="Manage your upcoming events and RSVPs on 3vent." />

      <main class="flex flex-col mx-auto container flex-grow animate-appear pt-10">
        <h1 class="font-bold text-xl mb-6">My upcoming RSVPs</h1>
        <Switch>
          <Match when={!accountData()?.address}>
            <div class="animate-appear m-auto max-w-screen-2xs">
              <p class="mb-6">
                Connect your wallet and make sure to use <span class="font-bold">Polygon Mumbai network</span> to create
                view your upcoming RSVPs.
              </p>
              <ButtonGroupWalletOptions />
            </div>
          </Match>
          <Match when={accountData()?.address}>
            <Show when={networkData()?.chain?.unsupported === true}>
              <div class="animate-appear flex flex-col sm:justify-center sm:items-center sm:text-center mt10: sm:m-auto max-w-screen-2xs">
                <p class="mb-6">
                  Make sure to use <span class="font-bold">Polygon Mumbai network</span> to see your upcoming RSVPs.
                </p>
                <ButtonSwitchNetwork />
              </div>
            </Show>
            <Show when={networkData()?.chain?.unsupported === false}>
              <ListEvents
                loading={upcomingRSVPs?.loading}
                list={upcomingRSVPs()?.data?.account?.rsvps?.filter(event => event?.event?.eventTimestamp * 1> new Date().getTime())}
                error={upcomingRSVPs()?.error}
              />
            </Show>
          </Match>
        </Switch>
      </main>
    </>
  )
}

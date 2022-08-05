import FormCreateEvent from '@components/_pages/FormCreateEvent'
import { Match, Show, Switch } from 'solid-js'
import { Title, Meta } from 'solid-meta'
import useAccount from '@hooks/useAccount'
import ButtonGroupWalletOptions from '@components/ButtonGroupWalletOptions'
import useNetwork from '@hooks/useNetwork'
import useToast from '@hooks/useToast'
import ButtonSwitchNetwork from '@components/ButtonSwitchNetwork'
export default function Page() {
  const { accountData } = useAccount()
  const { networkData } = useNetwork()
  return (
    <>
      <Title>Create event - 3vent</Title>
      <Meta name="description" content="Create your virtual event on the blockchain with 3vent." />
      <main class="flex flex-col mx-auto container flex-grow animate-appear pt-10">
        <h1 class="font-bold text-xl mb-6">Create new event</h1>
        <Switch>
          <Match when={!accountData()?.address}>
            <div class="animate-appear m-auto max-w-screen-2xs">
              <p class="mb-6">
                Connect your wallet and make sure to use <span class="font-bold">Polygon Mumbai network</span> to create
                a new event.
              </p>
              <ButtonGroupWalletOptions />
            </div>
          </Match>
          <Match when={accountData()?.address}>
            <Show when={networkData()?.chain?.unsupported === true}>
              <div class="animate-appear flex flex-col sm:justify-center sm:items-center sm:text-center mt10: sm:m-auto max-w-screen-2xs">
                <p class="mb-6">
                  Make sure to use <span class="font-bold">Polygon Mumbai network</span> to create a new event.
                </p>
                <ButtonSwitchNetwork />
              </div>
            </Show>
            <Show when={networkData()?.chain?.unsupported === false}>
              <div class="animate-appear md:w-3/4">
                <FormCreateEvent />
              </div>
            </Show>
          </Match>
        </Switch>
      </main>
    </>
  )
}

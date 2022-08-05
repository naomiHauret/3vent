import { For, Show } from 'solid-js'
import useConnect from '@hooks/useConnect'
import Button from '@components/Button'
import useNetwork from '@hooks/useNetwork'
import useAccount from '@hooks/useAccount'

export const ButtonGroupWalletOptions = () => {
  const { connect, connectors, switchToSupportedNetwork } = useConnect()
  const { networkData } = useNetwork()
  const { accountData } = useAccount()

  return (
    <>
      <Show when={networkData()?.chain?.unsupported === true}>
        <div class="flex flex-col mx-auto mb-3">
          <p class="text-center mb-1 text-2xs text-neutral-500">You're using an unsupported network.</p>
          <Button onClick={switchToSupportedNetwork} class="w-full">
            Switch to a supported network
          </Button>
        </div>
      </Show>
      <div
        class="space-y-2"
        classList={{
          //@ts-ignore
          'opacity-50 pointer-events-none': networkData()?.chain?.unsupported === true && accountData()?.address,
        }}
      >
        <For each={connectors}>
          {(connector) => (
            <>
              <Button
                intent="neutral"
                aspect="outline-default"
                class="w-full flex items-center justify-center"
                /* @ts-ignore */
                disabled={connector.ready === false}
                onClick={() => {
                  connect(connector)
                }}
              >
                {/* @ts-ignore */}
                {connector?.name}{' '}
              </Button>
            </>
          )}
        </For>
      </div>
    </>
  )
}

export default ButtonGroupWalletOptions

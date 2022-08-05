import Button from '@components/Button'
import ButtonGroupWalletOptions from '@components/ButtonGroupWalletOptions'
import ButtonSwitchNetwork from '@components/ButtonSwitchNetwork'
import {
  ROUTE_EVENT_NEW,
  ROUTE_MY_PAST_EVENTS,
  ROUTE_MY_PAST_RSVPS,
  ROUTE_MY_UPCOMING_EVENTS,
  ROUTE_MY_UPCOMING_RSVPS,
} from '@config/routes'
import { shortenEthereumAddress } from '@helpers/shortenEthereumAddress'
import useAccount from '@hooks/useAccount'
import useNetwork from '@hooks/useNetwork'
import { disconnect } from '@wagmi/core'
import * as popover from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { Link } from 'solid-app-router'
import { createMemo, createUniqueId, Show } from 'solid-js'
import styles from './styles.module.css'

export const PopoverMenu = () => {
  const { accountData } = useAccount()
  const { networkData } = useNetwork()
  const [state, send] = useMachine(popover.machine({ id: createUniqueId() }))
  const api = createMemo(() => popover.connect(state, send, normalizeProps))

  return (
    <div>
      <Button scale="xs" {...api().triggerProps}>
        <Show when={accountData()?.address}>My account</Show>
        <Show when={!accountData()?.address}>Connect</Show>
      </Button>
      <div {...api().positionerProps}>
        <div class={`${styles['layer-flyout']} max-w-screen w-[18rem] rounded-md p-2`} {...api().contentProps}>
          <Show when={!accountData()?.address}>
            <ButtonGroupWalletOptions />
            <div class="mt-3 -mx-2 border-t text-3xs border-neutral">
              <div class="text-center block w-full text-start px-2 pt-2">
                Curious about web3 wallets ? <br />
                <a
                  class="underline font-semibold hover:no-underline hover:text-opacity-90 focus:no-underline focus:outline-bone"
                  href=""
                  target="_blank"
                >
                  Read more here
                </a>
              </div>
            </div>
          </Show>
          <Show when={accountData()?.address}>
            <div class="pb-2">
              <span class="text-3xs">
                Connected as{' '}
                <span class="px-1ex font-mono font-bold">{shortenEthereumAddress(accountData()?.address)}</span>
              </span>
            </div>
            <Show when={networkData()?.chain?.unsupported === true}>
              <div class="animate-appear mb-4 text-2xs">
                <p class="mb-2">
                  Please use <span class="font-bold">Polygon Mumbai network</span> to create a new event.
                </p>
                <ButtonSwitchNetwork scale="xs" />
              </div>
            </Show>
            <Show when={networkData()?.chain?.unsupported === false}>
              <nav class="text-2xs border border-t-neutral xs:hidden -mx-2 flex-col flex divide-y divide-neutral">
                <Link class="focus:bg-base-200 hover:bg-base-200 font-semibold p-2" href={ROUTE_EVENT_NEW}>
                  Create event
                </Link>
                <Link class="focus:bg-base-200 hover:bg-base-200 font-semibold p-2" href={ROUTE_MY_UPCOMING_EVENTS}>
                  My upcoming events
                </Link>
                <Link class="focus:bg-base-200 hover:bg-base-200 font-semibold p-2" href={ROUTE_MY_PAST_EVENTS}>
                  My past events
                </Link>
                <Link class="focus:bg-base-200 hover:bg-base-200 font-semibold p-2" href={ROUTE_MY_UPCOMING_RSVPS}>
                  My upcoming RSVPs
                </Link>
                <Link class="focus:bg-base-200 hover:bg-base-200 font-semibold p-2" href={ROUTE_MY_PAST_RSVPS}>
                  My past RSVPs
                </Link>
              </nav>
            </Show>
            <div class="-mx-2 -mb-2 border-t text-2xs border-neutral">
              <button
                class="italic focus:bg-base-200 hover:bg-base-200 block w-full text-start p-2"
                onClick={() => disconnect()}
              >
                Logout
              </button>
            </div>
          </Show>
        </div>
      </div>
    </div>
  )
}

export default PopoverMenu

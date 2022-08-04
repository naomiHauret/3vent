import { useAccount } from '@hooks/useAccount'
import { Link } from 'solid-app-router'
import { createEffect, Show } from 'solid-js'
import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import {
  ROUTE_EVENT_NEW,
  ROUTE_MY_PAST_EVENTS,
  ROUTE_MY_PAST_RSVPS,
  ROUTE_MY_UPCOMING_EVENTS,
  ROUTE_MY_UPCOMING_RSVPS,
} from '@config/routes'
import styles from './styles.module.css'

export const DesktopNavigation = () => {
  const { accountData } = useAccount()
  const [stateMenuEvents, sendMenuEvents] = useMachine(
    menu.machine({ id: createUniqueId(), 'aria-label': 'My events' }),
  )
  const apiMenuEvents = createMemo(() => menu.connect(stateMenuEvents, sendMenuEvents, normalizeProps))

  const [stateMenuRSVP, sendMenuRSVP] = useMachine(menu.machine({ id: createUniqueId(), 'aria-label': 'My RSVPs' }))
  const apiMenuRSVP = createMemo(() => menu.connect(stateMenuRSVP, sendMenuRSVP, normalizeProps))
  return (
    <>
      <Link class={`${styles.link} ${styles['button-link']}`} href={ROUTE_EVENT_NEW}>
        Create event
      </Link>
      <Show when={accountData()?.address}>
        <div>
          <button
            classList={{
              'bg-base-200': apiMenuEvents().isOpen,
            }}
            class={`${styles['button-link']} ${styles.link}`}
            {...apiMenuEvents().triggerProps}
          >
            My events <span aria-hidden>▾</span>
          </button>
          <div {...apiMenuEvents().positionerProps}>
            <ul class={`${styles['layer-flyout']} rounded-md -mt-1`} {...apiMenuEvents().contentProps}>
              <li {...apiMenuEvents().getItemProps({ id: 'events-upcoming' })}>
                <Link class={`${styles.link} ${styles['submenu-link']}`} href={ROUTE_MY_UPCOMING_EVENTS}>
                  Upcoming events
                </Link>
              </li>
              <li {...apiMenuEvents().getItemProps({ id: 'events-past' })}>
                <Link class={`${styles.link} ${styles['submenu-link']}`} href={ROUTE_MY_PAST_EVENTS}>
                  Past events
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button
            classList={{
              'bg-base-200': apiMenuRSVP().isOpen,
            }}
            class={`${styles.link} ${styles['button-link']}`}
            {...apiMenuRSVP().triggerProps}
          >
            My RSVPs <span aria-hidden>▾</span>
          </button>
          <div {...apiMenuRSVP().positionerProps}>
            <ul class={`${styles['layer-flyout']} rounded-md -mt-1`} {...apiMenuRSVP().contentProps}>
              <li {...apiMenuRSVP().getItemProps({ id: 'rsvps-upcoming' })}>
                <Link class={`${styles.link} ${styles['submenu-link']}`} href={ROUTE_MY_UPCOMING_RSVPS}>
                  Upcoming RSVPs
                </Link>
              </li>
              <li {...apiMenuRSVP().getItemProps({ id: 'rsvps-past' })}>
                <Link class={`${styles.link} ${styles['submenu-link']}`} href={ROUTE_MY_PAST_RSVPS}>
                  Past RSVPs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Show>
    </>
  )
}

export default DesktopNavigation

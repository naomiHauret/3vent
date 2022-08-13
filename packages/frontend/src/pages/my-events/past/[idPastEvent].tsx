import Button from '@components/Button'
import ButtonGroupWalletOptions from '@components/ButtonGroupWalletOptions'
import ButtonSwitchNetwork from '@components/ButtonSwitchNetwork'
import DialogTrackProgressIndexingAttendeeConfirmation from '@components/_pages/DialogTrackProgressIndexingAttendeeConfirmation'
import { ROUTE_MY_PAST_EVENTS } from '@config/routes'
import checkIfAttendeeConfirmed from '@helpers/checkIfAttendeeConfirmed'
import { shortenEthereumAddress } from '@helpers/shortenEthereumAddress'
import useAccount from '@hooks/useAccount'
import useConfirmAttendee from '@hooks/useConfirmAttendee'
import useNetwork from '@hooks/useNetwork'
import { format, formatDistanceToNow } from 'date-fns'
import { useRouteData } from 'solid-app-router'
import { For, Match, Show, Switch } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Link, Meta, Title } from 'solid-meta'

export default function Page() {
  const { accountData } = useAccount()
  const { networkData } = useNetwork()
  const event = useRouteData()
  const {
    txReceipt,
    stateIndexEvent,
    apiDialogModalTrackProgress,
    confirmAttendee, 
    confirmAllAttendees,
    successMessage,
  } = useConfirmAttendee()
  return (
    <>
      <Title>Past event details - 3vent</Title>
      <Meta name="description" content="(Re)Discover and manage your past events and RSVPs on 3vent." />

      <div class="flex flex-col mx-auto container flex-grow animate-appear pt-10">
        <Switch>
          <Match when={!accountData()?.address}>
            <div class="animate-appear m-auto max-w-screen-2xs">
              <p class="mb-6">
                Connect your wallet and make sure to use <span class="font-bold">Polygon Mumbai network</span> view this page.
              </p>
              <ButtonGroupWalletOptions />
            </div>
          </Match>
          <Match when={accountData()?.address}>
            <Show when={networkData()?.chain?.unsupported === true}>
              <div class="animate-appear flex flex-col sm:justify-center sm:items-center sm:text-center mt10: sm:m-auto max-w-screen-2xs">
                <p class="mb-6">
                  Make sure to use <span class="font-bold">Polygon Mumbai network</span> view this page.
                </p>
                <ButtonSwitchNetwork />
              </div>
            </Show>
            <Show when={networkData()?.chain?.unsupported === false}>
              <Switch>
              <Match when={event?.loading && !event()?.data?.event}>
                <div class="container mx-auto animate-appear">
                  Loading, one moment please...
                </div>
              </Match>
              <Match when={event()?.data?.event === null && event()?.error}>
                <Title>Something went wrong - 3vent</Title>
                <div class="container mx-auto animate-appear">
                  <p>
                    {event()?.error}
                  </p>
                </div>
              </Match>
              <Match when={event()?.data?.event === null && event?.loading === false}>
                <Title>Event not found - 3vent</Title>
                <div class="container mx-auto animate-appear text-center">
                  <h1 class="font-bold text-xl mb-4">Event not found</h1>
                  <p>
                    It looks like the event you're looking for doesn't exist.
                  </p>
                </div>
              </Match>
              <Match when={event()?.data?.event}>
                <main class="mx-auto container flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-i-24">
                  <Title>{event().data.event.name} - past event - 3vent</Title>
                  <Meta name="description" content={`Learn more about ${event().data.event.name} on 3vent.`} />
                  <Link class="flex items-center link text-2xs" href={ROUTE_MY_PAST_EVENTS}>
                    Back to your past events
                  </Link>
                  <section class="mt-4 w-full md:w-2/3">
                    <h1 class='sr-only'>
                      {event().data.event.name}
                    </h1>
                    <div class="flex flex-col">
                      <span class="text-2xs text-neutral flex flex-wrap items-baseline">
                        <span class="pie-1ex">
                        {format(new Date(event().data.event?.eventTimestamp * 1), "PPpp")}

                        </span>
                        <span class="text-3xs">&nbsp;({formatDistanceToNow(event().data.event?.eventTimestamp * 1, { addSuffix: true })})</span>
                      </span>
                      <span class='font-bold text-xl mb-4'>
                        {event().data.event.name}
                      </span>
                    </div>
                    <Show when={accountData().address.toLowerCase() === event().data.event.eventOwner.toLowerCase()}>
                      <Show when={event().data.event.rsvps.length > 0}>

                      <table classList={{
                        "pointer-events-none animate-pulse": event.loading
                      }} class="table w-full border-solid border border-neutral overflow-hidden table-auto text-start">
                        <thead class="block md:table-header-group">
                          <tr class="z-10 relative text-opacity-40 border-b border-neutral text-2xs font-bold top-0 grid grid-cols-1 md:table-row">
                            <For each={["Attendee address", "Confirmed ?", "Confirm attendance"]}>
                              {label => <th class="text-start px-3 py-3 md:py-1.5">
                              {label}
                            </th>}
                            </For>
                          </tr>
                        </thead>
                        <tbody class="block md:table-row-group rounded-b-md divide-y divide-solid divide-neutral">
                          <For each={event().data.event.rsvps}>
                            {(row) => (
                              <tr class="grid grid-cols-1 md:table-row relative">
                                <td class="md:table-cell px-3 py-3.5">
                                  {shortenEthereumAddress(row.attendee.id)}
                                </td>
                                <td class="md:table-cell px-3 py-3.5">
                                  <Show when={checkIfAttendeeConfirmed(event().data.event, row.attendee.id)}>
                                    <span aria-hidden="true">☑ Yes</span>
                                    <span class="sr-only">Confirmed</span>
                                  </Show>
                                  <Show when={!checkIfAttendeeConfirmed(event().data.event, row.attendee.id)}>
                                    <span aria-hidden="true">☐ No</span>
                                    <span class="sr-only">Not confirmed</span>
                                  </Show>
                                </td>
                                <td class="md:table-cell px-3 py-3.5">
                                  <Button onClick={() => confirmAttendee({eventId: event().data.event.id, attendee: row.attendee.id })} class="w-full" scale="xs" disabled={checkIfAttendeeConfirmed(event().data.event, row.attendee.id) || stateIndexEvent.isLoading} >
                                    <Show when={checkIfAttendeeConfirmed(event().data.event, row.attendee.id)}>
                                      Already confirmed
                                    </Show>
                                    <Show when={!checkIfAttendeeConfirmed(event().data.event, row.attendee.id)}>
                                      Confirm
                                    </Show>
                                  </Button>
                                </td>
                              </tr>
                            )}
                          </For>
                        </tbody>
                      </table>
                      </Show>
                      <Show when={event().data.event.rsvps.length === 0}>
                        <p class="italic neutral">No attendees to display.</p>
                      </Show>
                    </Show>
                    <Show when={accountData().address.toLowerCase() !== event().data.event.eventOwner.toLowerCase()}>
                      <p>You do not have permission to manage this event.</p>
                    </Show>
                  </section>
                  <section class="w-full md:w-1/3 md:pt-20 text-2xs">
                    <p class="text-2xs mb-2 font-bold">{event().data.event.rsvps.length}&nbsp;RSVPs</p>
                    <p class="text-2xs mb-2 font-bold">
                      {event().data.event.rsvps.filter(
                          rsvp => checkIfAttendeeConfirmed(event().data.event, rsvp.attendee.id)
                      ).length}&nbsp;
                      confirmed
                     </p>
                    <Show when={
                      accountData().address.toLowerCase() === event().data.event.eventOwner.toLowerCase()
                      && event().data.event.rsvps.length > 0 
                      && event().data.event.rsvps.filter(
                        rsvp => checkIfAttendeeConfirmed(event().data.event, rsvp.attendee.id)
                      ).length < event().data.event.rsvps.length 
                    }>
                      <Button 
                        class="w-full md:sticky md:top-5 md:inline-start-0"
                        disabled={stateIndexEvent.isLoading}
                        onClick={confirmAllAttendees}>
                        Confirm all
                      </Button>
                    </Show>

                  </section>
                </main>
                {apiDialogModalTrackProgress().isOpen && (
                <Portal>
                  <DialogTrackProgressIndexingAttendeeConfirmation
                    api={apiDialogModalTrackProgress}
                    stateIndexEvent={stateIndexEvent}
                    txReceipt={txReceipt}
                    successMessage={successMessage}
                  />
                </Portal>
              )}

              </Match>
              </Switch>
          </Show>
          </Match>
        </Switch>
      </div>
    </>
  )
}

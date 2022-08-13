import CardEvent from "@components/CardEvent"
import { For, Show } from "solid-js"

export const ListEvents = (props) => {
    return <>
    
    <Show when={props?.loading}>
    <div class="grid gap-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 animate-appear">
        <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
        <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
        <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
        <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
        <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
        <div class="rounded col-span-1 w-full h-52 animate-pulse bg-neutral" />
    </div>
    </Show>
    <Show when={!props?.loading}>
    <Show when={!props?.list && props?.error}>
      <p class="animate-appear p-3 font-semibold rounded-md border- mt-6 border border-negative-200 bg-negative-100 text-on-negative">
        {props?.error}
      </p>
    </Show>
    <Show when={props?.list?.length > 0}>
      <ul class="grid gap-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 animate-appear">
        <For each={props?.list}>
          {event => <li class="col-span-1">
            <CardEvent event={event?.event ?? event} />
          </li>}
        </For>
      </ul>
    </Show>
    <Show when={props?.list?.length === 0}>
      <p class="italic animate-appear">No event found</p>
    </Show>
    </Show>
    </>

}

export default ListEvents
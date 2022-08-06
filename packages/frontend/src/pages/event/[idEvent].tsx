import { useRouteData } from 'solid-app-router'
import { createEffect } from 'solid-js'
import { Meta, Title } from 'solid-meta'

export default function Page() {
  const event = useRouteData()
  createEffect(() => {
    console.log(event)
  })
  return (
    <>
      <Title>Event details - 3vent</Title>
      <Meta name="description" content="Learn more about virtual events on 3vent." />
      <main class="mx-auto container">
        <h1>Event details</h1>
      </main>
    </>
  )
}

import { lazy } from 'solid-js'
import { Route, Routes } from 'solid-app-router'
import Home from './pages/home'
import {
  ROUTE_EVENT_VIEW,
  ROUTE_EVENT_NEW,
  ROUTE_MY_PAST_EVENTS_VIEW_EVENT,
  ROUTE_MY_PAST_EVENTS,
  ROUTE_MY_UPCOMING_EVENTS,
  ROUTE_MY_PAST_RSVPS,
  ROUTE_MY_UPCOMING_RSVPS,
} from '@config/routes'
import EventData from '@pages/event/[idEvent].data'

const PageError404 = lazy(() => import('./errors/404'))
const PageCreateEvent = lazy(() => import('./pages/event/new'))
const PageEvent = lazy(() => import('./pages/event/[idEvent]'))

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={ROUTE_EVENT_NEW} element={<PageCreateEvent />} />
      <Route path={ROUTE_EVENT_VIEW} data={EventData} element={<PageEvent />} />

      <Route path="**" element={<PageError404 />} />
    </Routes>
  )
}

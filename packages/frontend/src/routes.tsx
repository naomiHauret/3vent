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
import PastEventData from '@pages/my-events/past/[idPastEvent].data'

const PageError404 = lazy(() => import('./errors/404'))
const PageCreateEvent = lazy(() => import('./pages/event/new'))
const PageEvent = lazy(() => import('./pages/event/[idEvent]'))
const PageUpcomingRSVPs = lazy(() => import('./pages/my-rsvps/upcoming'))
const PagePastRSVPs = lazy(() => import('./pages/my-rsvps/past'))
const PageMyUpcomingEvents = lazy(() => import('./pages/my-events/upcoming'))
const PageMyPastEvents = lazy(() => import('./pages/my-events/past'))
const PagePastEventDetails = lazy(() => import('./pages/my-events/past/[idPastEvent]'))

export const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={ROUTE_EVENT_NEW} element={<PageCreateEvent />} />
      <Route path={ROUTE_EVENT_VIEW} data={EventData} element={<PageEvent />} />
      <Route path={ROUTE_MY_UPCOMING_EVENTS} element={<PageMyUpcomingEvents />} />
      <Route path={ROUTE_MY_PAST_EVENTS} element={<PageMyPastEvents />} />
      <Route path={ROUTE_MY_UPCOMING_RSVPS} element={<PageUpcomingRSVPs />} />
      <Route path={ROUTE_MY_PAST_RSVPS} element={<PagePastRSVPs />} />
      <Route path={ROUTE_MY_PAST_EVENTS_VIEW_EVENT} data={PastEventData} element={<PagePastEventDetails />} />
      <Route path="**" element={<PageError404 />} />
    </Routes>
  )
}

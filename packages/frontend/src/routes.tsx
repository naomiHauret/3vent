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

const PageError404 = lazy(() => import('./errors/404'))
export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="**" element={<PageError404 />} />
    </Routes>
  )
}

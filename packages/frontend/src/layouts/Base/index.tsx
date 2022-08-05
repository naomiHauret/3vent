import { Show } from 'solid-js'
import { Link, useIsRouting } from 'solid-app-router'
import PopoverMenu from './PopoverMenu'
import DesktopNavigation from './DesktopNavigation'

export const BasicLayout = (props) => {
  const isRouting = useIsRouting()
  return (
    <>
      <div class="border-b border-b-base-300 py-2">
        <div class="flex mx-auto container items-center justify-between relative z-20">
          <nav class="space-i-4 items-center xs:space-i-4 sm:space-i-10 flex">
            <Link href="/">
              <span class="sr-only">Home</span>
              <span aria-hidden="true">3vent</span>
            </Link>
            <div class="hidden xs:flex font-semibold xs:space-i-4 sm:space-i-10">
              <DesktopNavigation />
            </div>
          </nav>
          <div class="space-i-2 flex">
            <PopoverMenu />
          </div>
        </div>
      </div>
      <div class="flex-grow flex flex-col ">
        <Show when={!isRouting()}>{props.children}</Show>
      </div>
      <footer class="text-2xs border-t border-base-300 py-2">
        <div class="mx-auto container flex flex-col space-y-4 2xs:space-y-0 2xs:flex-row 2xs:space-i-6">
          <a class="font-bold" href="https://www.30daysofweb3.xyz/" target="_blank">
            30 Days of Web3
          </a>
          <a href="https://twitter.com/womenbuildweb3" target="_blank">
            Twitter
          </a>
          <a href="https://github.com/naomiHauret/3vent" target="_blank">
            GitHub
          </a>
        </div>
      </footer>
    </>
  )
}

export default BasicLayout

import type { Component } from 'solid-js'
import { MetaProvider } from 'solid-meta'
import { BasicLayout } from '@layouts/Base'
import { ProviderToast } from '@hooks/useToast'
import { Router } from './routes'
import { ProviderWagmi } from '@hooks/useWagmiStore'

const App: Component = () => {
  return (
    <MetaProvider>
      <ProviderToast>
        <ProviderWagmi>
          <BasicLayout>
            <Router />
          </BasicLayout>
        </ProviderWagmi>
      </ProviderToast>
    </MetaProvider>
  )
}

export default App

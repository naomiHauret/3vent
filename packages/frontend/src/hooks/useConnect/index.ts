import { connect, switchNetwork, chain } from '@wagmi/core'
import useWagmiStore from '../useWagmiStore'

export function useConnect() {
  const wagmiState = useWagmiStore()
  //@ts-ignore
  async function connectWallet(connector) {
    try {
      await connect({ connector })
    } catch (e) {
      console.error(e)
    }
  }

  async function switchToSupportedNetwork() {
    try {
      await switchNetwork({ chainId: chain.polygonMumbai.id })
    } catch (e) {
      //@TODO: add toast error here
      console.error(e)
    }
  }

  return {
    connect: connectWallet,
    switchToSupportedNetwork,
    //@ts-ignore
    connectors: wagmiState.connectors,
  }
}

export default useConnect

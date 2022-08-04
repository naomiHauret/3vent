import client from '@config/wagmi'
import { getAccount, getNetwork, watchAccount, connect, watchNetwork, disconnect, fetchBalance } from '@wagmi/core'
import { createContext, createEffect, createSignal, useContext } from 'solid-js'
import create from 'solid-zustand'

export const useWagmiStore = create(client.store)
const useBalanceStore = create((set) => ({
  balanceOf: {},
  loading: true,
  error: null,
  setBalanceOf: (address, value) =>
    set((state) => ({
      balanceOf: {
        //@ts-ignore
        ...state.balanceOf,
        [address]: value,
      },
    })),
  setError: (value) => set((state) => ({ error: value })),
  setLoading: (value) => set((state) => ({ loading: value })),
}))

const ContextWagmi = createContext()

export function ProviderWagmi(props) {
  const [accountData, setAccountData] = createSignal(getAccount())
  const [networkData, setNetworkData] = createSignal(getNetwork())
  const balanceState = useBalanceStore()

  async function updateBalanceOf(tokenAddress?: string) {
    let addressToUpdate = tokenAddress ? tokenAddress : accountData().address
    //@ts-ignore
    balanceState.setLoading(true)
    //@ts-ignore
    balanceState.setError(null)
    try {
      if (tokenAddress) {
        const balance = await fetchBalance({
          addressOrName: accountData().address,
          token: tokenAddress,
          chainId: networkData()?.chain.id,
        })
        if (balance.decimals !== 18) {
          // @ts-ignore
          balance.formatted = `${10 ** (18 - balance.decimals) * balance.formatted}`
        }
        //@ts-ignore
        balanceState.setBalanceOf(addressToUpdate, balance)
      }
      const chainTokenBalance = await fetchBalance({
        addressOrName: accountData().address,
        chainId: networkData()?.chain.id,
      })
      //@ts-ignore
      balanceState.setBalanceOf(accountData().address, chainTokenBalance)
      //@ts-ignore
      balanceState.setLoading(false)
      //@ts-ignore
      balanceState.setError(null)
    } catch (e) {
      //@ts-ignore
      balanceState.setLoading(false)
      //@ts-ignore
      balanceState.setError(e)
    }
  }

  createEffect(() => {
    setAccountData(getAccount())
    const unwatchAccount = watchAccount(setAccountData)
    return () => {
      unwatchAccount()
    }
  })

  createEffect(async () => {
    setNetworkData(getNetwork())

    const unwatch = watchNetwork(setNetworkData)
    return () => {
      unwatch()
    }
  })

  createEffect(async () => {
    if (accountData().address && networkData()?.chain) {
      //@ts-ignore
      balanceState.setLoading(true)
      try {
        if (!accountData()?.connector) {
          const idConnector = JSON.parse(client.storage['wagmi.wallet'])
          // @ts-expect-error
          const connector = wagmiState.connectors.filter((c) => c.id === idConnector)[0]
          await connect({ connector })
        }
        await updateBalanceOf(accountData().address)
        //@ts-ignore
        balanceState.setLoading(false)
        //@ts-ignore
        balanceState.setError(null)
      } catch (e) {
        //@ts-ignore
        balanceState.setLoading(false)
        //@ts-ignore
        balanceState.setError(e)
      }
    }
  })
  const store = {
    balanceState,
    updateBalanceOf,
    accountData,
    networkData,
  }
  return <ContextWagmi.Provider value={store}>{props.children}</ContextWagmi.Provider>
}

export function useWagmi() {
  return useContext(ContextWagmi)
}

export default useWagmiStore

import { useWagmi } from '../useWagmiStore'

export function useNetwork() {
  //@ts-ignore
  const { networkData } = useWagmi()
  return {
    networkData,
  }
}

export default useNetwork

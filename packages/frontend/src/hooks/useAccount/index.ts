import { useWagmi } from '@hooks/useWagmiStore'

export function useAccount() {
  //@ts-ignore
  const { accountData } = useWagmi()

  return {
    accountData,
  }
}

export default useAccount

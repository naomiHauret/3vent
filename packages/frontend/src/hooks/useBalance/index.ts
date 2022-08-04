import { useWagmi } from '../useWagmiStore'

export function useBalance() {
  //@ts-ignore
  const { balanceState, updateBalanceOf } = useWagmi()
  return {
    balanceState,
    updateBalanceOf,
  }
}

export default useBalance

import Button from '@components/Button'
import useToast from '@hooks/useToast'
import { chain, switchNetwork } from '@wagmi/core'
import { createSignal, Show } from 'solid-js'

export const ButtonSwitchNetwork = (props) => {
  const toast = useToast()
  const [changingNetwork, setChangingNetwork] = createSignal(true)

  async function onChangeNetwork() {
    setChangingNetwork(true)
    try {
      await switchNetwork({ chainId: chain.polygonMumbai.id })
      setChangingNetwork(false)
    } catch (e) {
      setChangingNetwork(false)
      console.error(e)
      //@ts-ignore
      toast().create({
        type: 'error',
        title: `Something went wrong and your network couldn't be switched. Please try again.`,
      })
    }
  }
  return (
    <Button scale={props.scale} loading={changingNetwork()} onClick={onChangeNetwork}>
      <Show when={changingNetwork()}>Switching network...</Show>
      <Show when={!changingNetwork()}>Switch to Polygon Mumbai network</Show>
    </Button>
  )
}

export default ButtonSwitchNetwork

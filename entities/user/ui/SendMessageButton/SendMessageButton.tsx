import { Button } from '@/shared/components'

export const SendMessageButton = () => {
  const OpenMessageHandler = () => {
    console.log('Открыть раздел с сообщениями')
  }
  return (
    <Button variant="secondary" onClick={OpenMessageHandler}>
      Send Message
    </Button>
  )
}

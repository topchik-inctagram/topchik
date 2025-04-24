import {Button} from '@/shared/components';

export const ProfileSettingsButton = () => {
  const OpenProfileSettingsHandler = () => {
    console.log('Открыть раздел с настройками профиля')
  }
  return (
    <Button variant='secondary' onClick={OpenProfileSettingsHandler}>Profile Settings</Button>
  )
}
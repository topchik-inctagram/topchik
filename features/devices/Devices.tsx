'use client'

import {
  useGetDevicesQuery,
  useDeleteAllDevicesMutation,
  useDeleteDeviceMutation,
} from '@/features/devices/api'
import { Button, Typography } from '@/shared/components'
import s from './Devices.module.scss'
import { useState } from 'react'
import { Toast } from '@/shared/components/Toast/Toast'
import { LogOutOutline, ChromeIcon, DesktopIcon, MobileIcon } from '@/public/icons'

export const Devices = () => {
  const { data: devices = [], isLoading } = useGetDevicesQuery()
  const [deleteAllDevices, { isLoading: isDeletingAll }] = useDeleteAllDevicesMutation()
  const [deleteDevice] = useDeleteDeviceMutation()
  const [toast, setToast] = useState<{ variant: 'success' | 'error'; description: string } | null>(
    null
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const currentDevice = devices.find(device => device.current)
  const activeDevices = devices.filter(device => !device.current)

  const handleTerminateAll = async () => {
    try {
      await deleteAllDevices().unwrap()
      setToast({ variant: 'success', description: 'All sessions terminated successfully.' })
      setTimeout(() => {
        setToast(null)
      }, 3000)
    } catch (error) {
      console.error('Failed to terminate all sessions', error)
      setToast({ variant: 'error', description: 'Failed to terminate sessions.' })
    }
  }

  const handleDeleteDevice = async (deviceId: string) => {
    try {
      await deleteDevice(deviceId).unwrap()
      setToast({ variant: 'success', description: 'Device logged out successfully.' })
      setTimeout(() => {
        setToast(null)
      }, 3000)
    } catch (error) {
      console.error('Failed to delete device', error)
      setToast({ variant: 'error', description: 'Failed to logout device.' })
    }
  }

  const getDeviceIcon = (deviceType: string) => {
    const iconProps = { className: s.deviceIcon, width: 36, height: 36 }

    if (deviceType?.toLowerCase() === 'desktop') {
      return <DesktopIcon {...iconProps} />
    }
    if (deviceType?.toLowerCase() === 'mobile') {
      return <MobileIcon {...iconProps} />
    }
    return <ChromeIcon {...iconProps} />
  }

  return (
    <>
      {toast && (
        <Toast
          open
          description={toast.description}
          title={toast.variant === 'error' ? 'Error!' : 'Success!'}
          variant={toast.variant}
        />
      )}
      <div className={s.pageWrapper}>
        <Typography className={s.currentSessionsTitle} variant="h3">
          Current device
        </Typography>
        {currentDevice && (
          <div className={s.containerCurrentDevice}>
            <div className={s.deviceInfo}>
              <ChromeIcon className={s.deviceIcon} height={36} width={36} />
              <div>
                <Typography className={s.deviceName} variant="bold_16">
                  {currentDevice.browserName}
                </Typography>
                <Typography variant="regular_14">IP: {currentDevice.ip}</Typography>
              </div>
            </div>
          </div>
        )}

        <div className={s.terminateAllWrapper}>
          <Button disabled={isDeletingAll} variant="outlined" onClick={handleTerminateAll}>
            Terminate all other sessions
          </Button>
        </div>

        <Typography className={s.activeSessionsTitle} variant="h3">
          Active sessions
        </Typography>

        {activeDevices.length === 0 ? (
          <Typography className={s.centerText} variant="h1">
            You have not yet logged in from other devices
          </Typography>
        ) : (
          <div className={s.sessionsList}>
            {activeDevices.map(device => (
              <div key={device.id} className={s.containerActiveSessions}>
                <div className={s.deviceInfo}>
                  {getDeviceIcon(device.deviceType)}
                  <div>
                    <Typography className={s.deviceName} variant="bold_16">
                      {device.browserName ?? 'Unknown Device'}
                    </Typography>
                    <Typography className={s.deviceIP} variant="regular_14">
                      IP: {device.ip}
                    </Typography>
                    <Typography variant="small">
                      Last visit: {new Date(device.lastActiveDate).toLocaleDateString()}
                    </Typography>
                  </div>
                </div>
                <Typography
                  as="span"
                  className={s.logoutText}
                  variant="medium_14"
                  onClick={() => handleDeleteDevice(device.id)}
                >
                  <LogOutOutline />
                  Log Out
                </Typography>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

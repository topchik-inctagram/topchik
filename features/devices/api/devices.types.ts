export type DevicesResponse = {
  devices: {
    id: string
    browserName: string
    browserVersion: string
    deviceType: string
    osName: string
    osVersion: string
    deviceName: string
    lastActiveDate: string
    current: boolean
    ip: string
  }[]
}

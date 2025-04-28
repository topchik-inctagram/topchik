import { baseApi } from '@/shared/store'
import type { Device } from './devices.types'

export const DevicesService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDevices: builder.query<Device[], void>({
      query: () => ({
        url: '/api/v1/security/devices',
        method: 'GET',
      }),
      providesTags: ['Devices'],
    }),

    deleteAllDevices: builder.mutation<void, void>({
      query: () => ({
        url: '/api/v1/security/devices',
        method: 'DELETE',
      }),
      invalidatesTags: ['Devices'],
    }),

    deleteDevice: builder.mutation<void, string>({
      query: deviceId => ({
        url: `/api/v1/security/devices/${deviceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Devices'],
    }),
  }),
})

export const { useGetDevicesQuery, useDeleteAllDevicesMutation, useDeleteDeviceMutation } =
  DevicesService

'use client'

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useDispatch } from 'react-redux'
import {
  setRecaptchaToken,
  setRecaptchaLoading,
  setRecaptchaError,
} from '@/features/recaptchaSlice'
import { useCallback } from 'react'

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const dispatch = useDispatch()

  const getRecaptchaToken = useCallback(
    async (action: string): Promise<string | null> => {
      if (!executeRecaptcha) {
        dispatch(setRecaptchaError('Recaptcha not available'))
        return null
      }

      try {
        dispatch(setRecaptchaLoading(true))
        const token = await executeRecaptcha(action)
        dispatch(setRecaptchaToken(token))
        return token
      } catch (error) {
        dispatch(setRecaptchaError('Failed to execute recaptcha'))
        return null
      }
    },
    [executeRecaptcha, dispatch]
  )

  return { getRecaptchaToken }
}

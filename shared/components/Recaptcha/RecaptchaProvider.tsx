'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import React from 'react'

interface RecaptchaProviderProps {
  children: React.ReactNode
}

const RecaptchaProvider: React.FC<RecaptchaProviderProps> = ({ children }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}

export default RecaptchaProvider

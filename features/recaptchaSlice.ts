import { createSlice } from '@reduxjs/toolkit'

interface RecaptchaState {
  token: string | null
  isLoading: boolean
  error: string | null
}

const initialState: RecaptchaState = {
  token: null,
  isLoading: false,
  error: null,
}

const recaptchaSlice = createSlice({
  name: 'recaptcha',
  initialState,
  reducers: {
    setRecaptchaToken: (state, action) => {
      state.token = action.payload
      state.isLoading = false
      state.error = null
    },
    setRecaptchaLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setRecaptchaError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearRecaptchaToken: state => {
      state.token = null
      state.isLoading = false
      state.error = null
    },
  },
})

export const { setRecaptchaToken, setRecaptchaLoading, setRecaptchaError, clearRecaptchaToken } =
  recaptchaSlice.actions

export default recaptchaSlice.reducer

export type LoginArgs = {
  email: string
  password: string
}
export type LoginResponse = {
  accessToken: string
}

export type RegistrationRequest = {
  email: string
  username: string
  password: string
  agreement: boolean
}

export const usernameRegex = /^[0-9A-Za-z_-]+$/
export const passwordRegex = new RegExp(
  '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?~`]).+$'
)

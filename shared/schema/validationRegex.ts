import { z } from 'zod'

export const usernameRegex = /^[0-9A-Za-z_-]+$/
export const passwordRegex = new RegExp(
  '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?~`]).+$'
)

export const usernameSchema = z
  .string()
  .min(6, 'Minimum number of characters 6')
  .max(30, 'Maximum number of characters 30')
  .regex(usernameRegex, 'Only letters, numbers, underscores and dashes allowed')

export const emailSchema = z.string().email('The email must match the format example@example.com')

export const passwordSchema = z
  .string()
  .min(6, 'Minimum number of characters 6')
  .max(20, 'Maximum number of characters 20')
  .regex(
    passwordRegex,
    'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
  )

export const confirmPasswordSchema = passwordSchema

export const agreementSchema = z.literal<boolean>(true, {
  errorMap: () => ({ message: 'You must accept the agreement' }),
})

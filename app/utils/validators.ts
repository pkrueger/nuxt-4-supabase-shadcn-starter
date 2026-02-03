import { z } from 'zod'

const requiredString = (fieldName: string) =>
  z.string({
    required_error: `${fieldName} is required`,
    invalid_type_error: `${fieldName} is required`,
  })

export const loginSchema = z.object({
  email: requiredString('Email').email('Please enter a valid email address'),
  password: requiredString('Password').min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  firstName: requiredString('First name').min(1, 'First name is required'),
  lastName: requiredString('Last name').min(1, 'Last name is required'),
  email: requiredString('Email').email('Please enter a valid email address'),
  password: requiredString('Password').min(6, 'Password must be at least 6 characters'),
  confirmPassword: requiredString('Confirm password').min(6, 'Password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: requiredString('Email').email('Please enter a valid email address'),
})

export const resetPasswordSchema = z.object({
  password: requiredString('Password').min(6, 'Password must be at least 6 characters'),
  confirmPassword: requiredString('Confirm password').min(6, 'Password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

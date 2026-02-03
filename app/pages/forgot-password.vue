<script setup lang="ts">
import { useForm, Field as VeeField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { forgotPasswordSchema, type ForgotPasswordInput } from '~/utils/validators'

definePageMeta({
  layout: 'auth',
})

const supabase = useSupabaseClient()
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const { handleSubmit } = useForm<ForgotPasswordInput>({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: {
    email: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) {
    errorMessage.value = error.message
    isLoading.value = false
    return
  }

  successMessage.value = 'Check your email for the password reset link!'
  isLoading.value = false
})
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader class="text-center">
      <CardTitle class="text-2xl">Forgot Password</CardTitle>
      <CardDescription>
        Enter your email to receive a password reset link
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form class="space-y-4" @submit="onSubmit">
        <Alert v-if="errorMessage" variant="destructive">
          <AlertDescription>{{ errorMessage }}</AlertDescription>
        </Alert>

        <Alert v-if="successMessage">
          <AlertDescription>{{ successMessage }}</AlertDescription>
        </Alert>

        <VeeField v-slot="{ field, errors }" name="email">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Email</FieldLabel>
            <Input
              v-bind="field"
              type="email"
              placeholder="you@example.com"
              :aria-invalid="!!errors.length"
              :disabled="isLoading || !!successMessage"
            />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>

        <Button type="submit" class="w-full" :disabled="isLoading || !!successMessage">
          {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
        </Button>
      </form>
    </CardContent>
    <CardFooter class="text-center text-sm">
      <div class="text-muted-foreground w-full">
        Remember your password?
        <NuxtLink to="/login" class="text-foreground hover:underline">
          Sign in
        </NuxtLink>
      </div>
    </CardFooter>
  </Card>
</template>
